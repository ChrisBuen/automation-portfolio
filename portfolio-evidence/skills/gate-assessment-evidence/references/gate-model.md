# Evidence gate model

```text
intake
  -> readiness_check
      -> not_ready -> readiness_check
      -> research_in_progress
          -> not_ready
          -> ready_for_human_review
              -> research_in_progress
              -> human decision
```

An automation may collect, validate, route, and summarize evidence. It may not convert missing evidence into a clean finding or make the final approval decision.

For each material claim, retain: claim, claimant, independent source, access date, confidence, contradiction status, and outstanding action.
