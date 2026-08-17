# AR, CAR, and fund assessment lifecycle

## Operating boundary

This is a case-management and evidence-coordination system for authorised-representative, corporate-authorised-representative, and fund applicants. It is not an autonomous onboarding or approval engine. The source system intentionally retained staff review at the points where evidence, legal advice, commercial terms, and licensing judgement must be owned by people.

## Four operating layers

| Layer | Responsibility |
|---|---|
| n8n workflows | Routing, checklists, API calls, notifications, database writes, signal delivery, and task orchestration |
| CAR Trigger MCP | Narrow staff/agent tools for starts, batch checks, research launch/completion, and manual milestone recording |
| Structured analysis routines | Meeting, reference, DD, engagement-letter, fund-mandate, and APL/outsourcing analyses |
| Research agents | Independent evidence work for individuals, companies, funds, legal counsel, infrastructure, and background checks |

MCP was deliberately a narrow internal command surface. It did not expose public forms, broad webhooks, schedules, gate internals, or activation functions as agent tools.

## Case journey

```text
Inquiry and routing
  -> staff desktop review and legal-advice assessment
  -> second desktop review
  -> staff-started document collection
  -> evidence development in parallel
      meeting + references + KYC + applicable research agents
  -> typed-signal fan-in gate
  -> DD report + human decision
  -> engagement letter and payment milestones
  -> contract work
  -> onboarding tasks, activation, supervision, archival
```

### 1. Inquiry and route selection

The intake route captures applicant identity, contact details, applicant type, intended licence path, and initial claims. It creates the case/folder convention and informs staff. The applicant type selects the downstream checklist and default research scope:

| Applicant type | Default independent research |
|---|---|
| Individual | RA-01 individual background research, RA-06 background checks |
| Corporate | RA-02 company research, RA-06 background checks |
| Fund | RA-02 company, RA-03 asset class and market, RA-04 legal counsel, RA-06 background checks |
| Fund with infrastructure requirement | Fund route plus RA-05 infrastructure and exchange research |

An optional RA-00 preliminary screen supports early triage but is not treated as a substitute for the full DD set.

### 2. Deliberate human gates before collection

Before staff initiate document collection, the file moves through First Desktop Review, legal-advice assessment, and Second Desktop Review. A no-go closes the case manually. If legal or tax advice is needed, the applicant obtains it or staff handles the permitted early-engagement path. These gates are not cosmetic: they avoid collecting and processing a full evidence pack for a case that has not cleared initial judgement.

### 3. Collection and reconciliation

The staff-started collection action creates an applicant-type checklist and sends the requested upload path. A separate batch check reconciles the full submitted set against that checklist, updates document state, records unmatched files for staff review, issues one consolidated acknowledgement, and emits `documents_ready` only after completeness is established. Upload webhooks and mailbox watchers are notifications, not evidence-completion engines; the design specifically avoids marking a case ready one file at a time.

### 4. Evidence development

Evidence is deliberately kept as separate evidence streams:

- CR-01 creates a meeting summary, claims, red flags, next steps, and commitments from a transcript;
- CR-02 assesses consistency and flags across reference responses;
- manual KYC is performed outside n8n, retained in the case evidence store, then recorded as `kyc_ready`;
- RA-01 to RA-06 prepare independent research reports appropriate to the applicant; and
- for fund cases, CR-05 may prepare a mandate risk summary before final DD synthesis.

Every research-agent completion stores its report location, structured finding data, and code before mapping to a signal. A reported job is not assumed complete merely because it was launched.

### 5. Typed completion signals and DD fan-in

The canonical manual signal path supports milestones such as `documents_ready`, `kyc_ready`, `references_ready`, `meetings_ready`, `ra01_ready` through `ra06_ready`, `letter_signed`, `payment_received`, `loa_signed`, and `contracts_executed`.

The gate evaluates the required evidence set for the actual case type. Missing evidence returns to its owner: a document gap goes back to collection, a research gap to the relevant agent, and a manual milestone to staff. The system does not convert absence into a clean result.

### 6. DD synthesis and decision

Once the required set is present, the DD routine receives application data, KYC evidence, reference analysis, meeting analysis, research reports, documents, and applicable fund inputs. Its output is a formal DD report with risk rating, recommendation, flags, conditions, and outstanding matters. Senior staff then records one of four outcomes: Proceed, Proceed with Conditions, Decline, or Request More Info. This decision is human-owned.

### 7. Engagement, contract, onboarding, and supervision

For a proceeding file, the system can prepare a draft engagement letter and staff review notes. Sending, signing, invoicing, payment, legal drafting, and execution are deliberately manual/controlled activities, represented by recorded signals rather than fictional automation. Both `letter_signed` and `payment_received` are prerequisites for contract preparation; executed contracts unlock onboarding tasks.

Onboarding creates common tasks such as ASIC, platform access, email, training, policy acknowledgement, and supervision setup. Fund pathways add tasks such as banking, ABN/TFN, trading accounts, fund administration, and insurance. Activation occurs only when all relevant human-owned tasks are complete, after which DD and onboarding records are archived and ongoing supervision is set up.

## Deployment and evidence status

The recorded project state was mixed. The CAR MCP tool registry, manual-signal sender, and research-agent launcher/completion receiver were deployed as narrowly controlled interfaces. Other workflows were built or deployed inactive, and some downstream activation credentials or integrations had known blockers. The asynchronous DD-report submit/runner/status path was shaped for long-running work but was not end-to-end tested. The repository presents the implemented control-plane components and documents the remaining operational behaviour without implying a fully autonomous system.

## Public-safety boundary

> **Presentation note:** Project materials are redacted for presentation purposes. Names, applicant data, documents, raw forms, policy content, live database IDs, hosts, email destinations, credentials, and live outputs are excluded or replaced. The repository retains presentation case material, workflow definitions, a local gate extract, and the lifecycle model needed to understand the work.
