import sys
import tempfile
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parents[1] / "src"))
import generate_market_chart


class MarketChartTests(unittest.TestCase):
    def test_fixture_loads_and_renders(self):
        fixture = Path(__file__).parents[1] / "samples" / "presentation-market-series.csv"
        rows = generate_market_chart.load_series(fixture)
        chart = generate_market_chart.render_svg(rows)
        self.assertEqual(len(rows), 6)
        self.assertIn("<polyline", chart)
        self.assertIn("Fictional portfolio fixture", chart)

    def test_unsorted_series_is_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "bad.csv"
            path.write_text("date,value\n2026-08-02,1\n2026-08-01,2\n", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "sorted"):
                generate_market_chart.load_series(path)


if __name__ == "__main__":
    unittest.main()
