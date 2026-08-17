# Test receipt

## Private pipeline results

| Check | Recorded result |
|---|---|
| v9 batch manifest | 12 work items present |
| Word outputs | 24 DOCX files generated |
| Batch QA | Passed |
| v11 styles and tables | Preserved |
| v11 headers and footers | Preserved |
| v11 embedded images | Preserved |
| Visible placeholders | Cleared |

These results are summarized from private build and QA records. The underlying client material is not included.

## Public package checks

```powershell
python -m unittest discover -s tests -v
```

Expected: five tests pass. The negative tests confirm that unresolved placeholders and internal reference codes block release; the template tests confirm nested input flattening, unknown-marker retention, and heading-bounded section removal.
