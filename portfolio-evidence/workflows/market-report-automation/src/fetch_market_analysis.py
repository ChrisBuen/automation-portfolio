from __future__ import annotations

import argparse
import json
import math
import statistics
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


BASE_URL = "https://api.binance.com/api/v3/klines"
ASSETS = {
    "BTC": {"symbol": "BTCUSDT", "name": "Bitcoin", "filename": "BTCmarketdata.md"},
    "ETH": {"symbol": "ETHUSDT", "name": "Ethereum", "filename": "ETHmarketdata.md"},
}


def fetch_daily_candles(symbol: str, limit: int = 220) -> list[dict[str, Any]]:
    query = urllib.parse.urlencode({"symbol": symbol, "interval": "1d", "limit": limit})
    request = urllib.request.Request(
        f"{BASE_URL}?{query}",
        headers={"Accept": "application/json", "User-Agent": "WeeklyReport/1.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))
    if not isinstance(payload, list) or len(payload) < 200:
        raise ValueError(f"Unexpected Binance payload for {symbol}.")
    return [
        {
            "date": datetime.fromtimestamp(row[0] / 1000, tz=timezone.utc).date().isoformat(),
            "open": float(row[1]),
            "high": float(row[2]),
            "low": float(row[3]),
            "close": float(row[4]),
            "volume": float(row[5]),
            "quote_volume": float(row[7]),
            "closed": int(row[6]) < int(datetime.now(tz=timezone.utc).timestamp() * 1000),
        }
        for row in payload
    ]


def ema(values: list[float], period: int) -> list[float]:
    multiplier = 2 / (period + 1)
    result = [values[0]]
    for value in values[1:]:
        result.append((value - result[-1]) * multiplier + result[-1])
    return result


def rsi(values: list[float], period: int) -> float:
    changes = [current - previous for previous, current in zip(values, values[1:])]
    gains = [max(change, 0) for change in changes[-period:]]
    losses = [abs(min(change, 0)) for change in changes[-period:]]
    average_gain = sum(gains) / period
    average_loss = sum(losses) / period
    if average_loss == 0:
        return 100.0
    relative_strength = average_gain / average_loss
    return 100 - (100 / (1 + relative_strength))


def atr(candles: list[dict[str, Any]], period: int = 14) -> float:
    ranges = []
    for previous, current in zip(candles, candles[1:]):
        ranges.append(
            max(
                current["high"] - current["low"],
                abs(current["high"] - previous["close"]),
                abs(current["low"] - previous["close"]),
            )
        )
    return sum(ranges[-period:]) / period


def money(value: float) -> str:
    if value >= 1_000:
        return f"${value:,.0f}"
    return f"${value:,.2f}"


def percent(value: float) -> str:
    return f"{value:+.2f}%"


def trend_label(price: float, averages: list[float]) -> str:
    score = sum(price > average for average in averages)
    if score == len(averages):
        return "Up"
    if score == 0:
        return "Down"
    return "Mixed"


def build_markdown(asset: str, metadata: dict[str, str], candles: list[dict[str, Any]]) -> str:
    closes = [row["close"] for row in candles]
    latest = candles[-1]
    seven = candles[-7:]
    latest_price = latest["close"]
    seven_change = (latest_price / seven[0]["open"] - 1) * 100

    sma_periods = [5, 10, 20, 30, 50, 100, 200]
    sma = {period: statistics.fmean(closes[-period:]) for period in sma_periods}
    ema_periods = [9, 12, 13, 26, 50, 100, 200]
    ema_values = {period: ema(closes, period)[-1] for period in ema_periods}
    macd_series = [
        fast - slow for fast, slow in zip(ema(closes, 12), ema(closes, 26))
    ]
    macd_signal = ema(macd_series, 9)[-1]
    macd_line = macd_series[-1]
    macd_histogram = macd_line - macd_signal
    std20 = statistics.pstdev(closes[-20:])
    lower_band = sma[20] - 2 * std20
    upper_band = sma[20] + 2 * std20
    recent14 = candles[-14:]
    highest14 = max(row["high"] for row in recent14)
    lowest14 = min(row["low"] for row in recent14)
    stochastic = (
        (latest_price - lowest14) / (highest14 - lowest14) * 100
        if highest14 != lowest14
        else 50
    )

    performance_windows = {"1D": 2, "1W": 8, "1M": 31, "3M": 91, "6M": 181}
    performance = {}
    for label, window in performance_windows.items():
        reference = closes[-window] if len(closes) >= window else closes[0]
        performance[label] = (latest_price / reference - 1) * 100

    lines = [
        f"# {asset} {metadata['name']} API Market Analysis",
        "",
        f"Fetched: {datetime.now(tz=timezone.utc).date().isoformat()}",
        f"Market: `{metadata['symbol']}`",
        f"Source: `{BASE_URL}?symbol={metadata['symbol']}&interval=1d&limit=220`",
        "",
        "## Seven-Day Price Window",
        "",
        (
            f"Price moved from a {money(seven[0]['open'])} opening level on "
            f"{seven[0]['date']} to {money(latest_price)} on {latest['date']}, "
            f"a {percent(seven_change)} change."
        ),
        (
            f"The seven-day high was {money(max(row['high'] for row in seven))}; "
            f"the low was {money(min(row['low'] for row in seven))}."
        ),
        (
            "The latest daily candle is complete."
            if latest["closed"]
            else "The latest daily candle is still open and may change before the UTC close."
        ),
        "",
        "| Date | Open | High | Low | Close | Change | USD volume |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ]
    for row in seven:
        daily_change = (row["close"] / row["open"] - 1) * 100
        lines.append(
            f"| {row['date']} | {money(row['open'])} | {money(row['high'])} | "
            f"{money(row['low'])} | {money(row['close'])} | {percent(daily_change)} | "
            f"${row['quote_volume'] / 1_000_000_000:,.2f}b |"
        )

    lines.extend(
        [
            "",
            "## Trend and Momentum",
            "",
            f"- Short-term trend: {trend_label(latest_price, [sma[5], sma[10], sma[20]])}.",
            f"- Medium-term trend: {trend_label(latest_price, [sma[30], sma[50], sma[100]])}.",
            f"- Long-term trend: {trend_label(latest_price, [sma[100], sma[200]])}.",
            f"- RSI-9: {rsi(closes, 9):.1f}.",
            f"- RSI-14: {rsi(closes, 14):.1f}.",
            f"- RSI-25: {rsi(closes, 25):.1f}.",
            f"- MACD line: {macd_line:,.2f}. Signal: {macd_signal:,.2f}. Histogram: {macd_histogram:,.2f}.",
            f"- ATR-14: {money(atr(candles))}.",
            f"- Bollinger Band range: {money(lower_band)} to {money(upper_band)}.",
            f"- Stochastic position within the latest 14-day range: {stochastic:.1f}.",
            "",
            "## Moving Averages",
            "",
            "| Average | Level | Price versus average |",
            "| --- | ---: | ---: |",
        ]
    )
    for period in sma_periods:
        lines.append(
            f"| SMA {period} | {money(sma[period])} | "
            f"{percent((latest_price / sma[period] - 1) * 100)} |"
        )
    for period in ema_periods:
        lines.append(
            f"| EMA {period} | {money(ema_values[period])} | "
            f"{percent((latest_price / ema_values[period] - 1) * 100)} |"
        )

    lines.extend(
        [
            "",
            "## Performance",
            "",
            "| Window | Change |",
            "| --- | ---: |",
        ]
    )
    for label, value in performance.items():
        lines.append(f"| {label} | {percent(value)} |")

    lines.extend(
        [
            "",
            "## Drafting Levels",
            "",
            f"- Seven-day low: {money(min(row['low'] for row in seven))}.",
            f"- Seven-day high: {money(max(row['high'] for row in seven))}.",
            f"- Twenty-day low: {money(min(row['low'] for row in candles[-20:]))}.",
            f"- Twenty-day high: {money(max(row['high'] for row in candles[-20:]))}.",
            f"- Thirty-day low: {money(min(row['low'] for row in candles[-30:]))}.",
            f"- Thirty-day high: {money(max(row['high'] for row in candles[-30:]))}.",
            "",
            "Use these levels as drafting evidence. Confirm chart-based support and resistance against the final price chart before publication.",
        ]
    )
    return "\n".join(lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch BTC and ETH daily market-analysis inputs.")
    parser.add_argument("--report-dir", required=True, help="Dated NewReport folder.")
    args = parser.parse_args()

    input_dir = Path(args.report_dir) / "Input"
    input_dir.mkdir(parents=True, exist_ok=True)
    raw: dict[str, list[dict[str, Any]]] = {}

    for asset, metadata in ASSETS.items():
        candles = fetch_daily_candles(metadata["symbol"])
        raw[asset] = candles
        output = input_dir / metadata["filename"]
        output.write_text(build_markdown(asset, metadata, candles), encoding="utf-8")
        print(f"Wrote {output}")

    raw_path = input_dir / "market-analysis.raw.json"
    raw_path.write_text(json.dumps(raw, indent=2), encoding="utf-8")
    print(f"Wrote {raw_path}")


if __name__ == "__main__":
    main()

