# Quality decision specification — AR, CAR, and fund onboarding

This source-backed model supplements the lifecycle overview. It records the decisions, stop conditions, correction routes, human controls, and release evidence that the overview diagram cannot show at GitHub width.

## Decision tree

| Gate | Pass condition | Failure or uncertainty route | Evidence created |
| --- | --- | --- | --- |
| Applicant routing | Applicant type and intended activity resolve to an Individual, Corporate, or Fund evidence plan | Return to intake owner; do not launch a generic case | Case record, required-signal matrix, specialist plan |
| First desktop review | The initial proposition is coherent enough to assess | Decline early or request clarification | Review outcome and rationale |
| Legal-advice assessment | Required legal input and responsibility are explicit | Hold case with legal owner | Legal-review milestone |
| Second desktop review | Early concerns are resolved and collection can begin | Return to the responsible reviewer | Go/no-go record |
| Document reconciliation | Required documents match the checklist; unmatched files remain visible | Chase the named gap or classify the unmatched file | Checklist state, unmatched-file log, `documents_ready` signal |
| Specialist completion | Each required routine stores its output and emits the correct typed signal | Retry/repair that routine; do not manufacture completion | Job record, research output, RA-code-to-signal mapping |
| Case completeness | Every signal required for this applicant type exists and the gate has not fired already | Return a precise missing-signal list to its owners | Locked case state, gate timestamp, completeness record |
| Synthesis readiness | Evidence is traceable and contradictions or gaps are visible | Request more information or return to evidence development | Draft DD report and exception set |
| Human DD decision | Named reviewer selects Proceed, Proceed with Conditions, Decline, or Request More Info | Case remains unapproved | Decision, conditions, rationale, reviewer |
| Engagement prerequisites | Signed letter and received payment both exist | Hold contract preparation | Manual milestone signals |
| Onboarding prerequisite | Contracts are executed | Hold activation and supervision setup | Contract milestone and onboarding task set |

## Controls that demonstrate quality

- Required evidence changes by applicant type; completeness is not a universal checklist.
- Manual work and automated routines enter one typed signal contract without losing ownership.
- Missing evidence is a blocking state, never a clean result.
- The fan-in gate uses row locking and a recorded trigger timestamp to prevent duplicate synthesis under concurrent completions.
- Long-running report generation uses submit, runner, and status surfaces rather than a fragile synchronous request.
- Automation prepares evidence and drafts; a named human owns approval, conditions, decline, and further-information decisions.

## Diagram brief

Show three layers: applicant-specific routing and early human gates; parallel evidence lanes with their own repair loops; a concurrency-safe completeness gate followed by human decision and prerequisite-controlled activation. Failure routes must identify the owner and artifact that changes before re-entry.

