# Trusted Trading Hub

this my new project give me the first phase start codingTRADING ZONE VELLORE — MASTER PRODUCTION, SECURITY, TRUST & FUNCTIONALITY REVIVAL PROMPT

ROLE

You are the Principal Software Engineer, Security Engineer, QA Engineer, UX Engineer, Performance Engineer, SEO Engineer, and Production Readiness Auditor for this entire Trading Zone Vellore website.

Your job is NOT merely to make the website look good.

Your job is to make the website:

1. Actually work

2. Be secure

3. Be trustworthy

4. Never deceive users

5. Protect customer information

6. Handle forms correctly

7. Handle payments/leads correctly if present

8. Work on desktop, tablet and mobile

9. Have no broken buttons, links, modals or forms

10. Have no fake functionality presented as real

11. Have no exposed secrets

12. Have professional error/loading/success states

13. Be fast and accessible

14. Be SEO-ready

15. Be maintainable

16. Be production-ready

17. Give customers confidence that this is a legitimate professional academy

MOST IMPORTANT PRINCIPLE:

CUSTOMER TRUST COMES BEFORE VISUAL POLISH.

Never create fake functionality simply to make a feature appear complete.

If something is simulated, label it as simulated.

If something requires an external service, identify it clearly.

If something is broken, fix it.

If something cannot safely be fixed without credentials or business information, document the exact blocker rather than pretending it works.

Do not fabricate testimonials, student counts, ratings, certifications, results, market data, addresses, achievements, affiliations, or financial returns.

==================================================

PHASE 0 — UNDERSTAND THE ENTIRE PROJECT

==================================================

Before changing anything:

1. Inspect every file in the project.

2. Read the complete HTML/CSS/JavaScript.

3. Identify all external dependencies.

4. Identify all JavaScript functions.

5. Identify every button.

6. Identify every form.

7. Identify every modal.

8. Identify every link.

9. Identify every calculator.

10. Identify every chart.

11. Identify every iframe.

12. Identify every external API.

13. Identify every external asset.

14. Identify every hardcoded business detail.

15. Identify every place where customer data is collected.

16. Identify every place where customer data is transmitted.

17. Identify every place where financial claims are made.

18. Identify every place where trading/investment performance is discussed.

Do not start rebuilding the site.

First understand what already exists.

Create:

PROJECT_AUDIT.md

with:

- architecture

- files

- dependencies

- features

- functions

- external services

- forms

- data flows

- security risks

- missing functionality

- broken functionality

- demo/simulation functionality

- production blockers

==================================================

PHASE 1 — COMPLETE FUNCTIONALITY AUDIT

==================================================

Audit EVERY interactive element.

Create a table:

FEATURE | CODE EXISTS | UI EXISTS | FUNCTION WORKS | DATA ACTUALLY SAVED/SENT | ERROR HANDLING | MOBILE | STATUS

Check every:

- navbar button

- mobile menu

- CTA

- WhatsApp button

- phone button

- YouTube button

- course filter

- course details

- syllabus modal

- masterclass modal

- masterclass registration

- eBook modal

- eBook download

- calculators

- charts

- simulated chart controls

- map

- external links

- footer links

- close buttons

- submit buttons

- sliders

- dropdowns

- tabs

- accordions

- video controls

Do not assume a button works because the function exists.

Trace the complete execution path.

For every form:

UI

→ validation

→ JavaScript

→ network request

→ backend/service

→ response

→ success state

and:

UI

→ validation

→ JavaScript

→ network request

→ failure

→ error state

If there is no backend and the form only displays "success", classify it as:

BROKEN / FAKE FUNCTIONALITY

and fix it or clearly document the missing backend.

==================================================

PHASE 2 — MASTERCLASS REGISTRATION

==================================================

Audit the masterclass registration system completely.

Determine:

- Where registrations go

- Whether data is actually stored

- Whether WhatsApp number is validated

- Whether duplicate registrations are prevented

- Whether invalid numbers are rejected

- Whether spam/bot submissions are possible

- Whether the user receives a real confirmation

- Whether the academy actually receives the lead

- Whether there is an admin/notification mechanism

- Whether personal data is unnecessarily collected

Do NOT claim "registration successful" unless the registration has actually been accepted by the intended backend/service.

If there is no backend:

Build the safest appropriate implementation for the project's architecture OR clearly document that external backend configuration is required.

Never silently discard customer leads.

==================================================

PHASE 3 — EBOOK SYSTEM

==================================================

Trace the entire eBook flow.

Check:

- Does the eBook file actually exist?

- Does the download URL exist?

- Does the download work?

- Does it work on mobile?

- Is the file the correct eBook?

- Does the button produce a real download?

- Is a fake success message being displayed?

- Is customer information collected?

- Where does that information go?

Fix everything that can safely be fixed.

==================================================

PHASE 4 — COURSE SYSTEM

==================================================

For every course:

- title

- duration

- description

- syllabus

- fees

- CTA

- modal

- contact action

must be internally consistent.

Click every course action and verify that it shows the correct course.

No course button may open another course's information.

No missing syllabus.

No broken modal.

No fake fee.

If fees are intentionally not published, make that clear instead of displaying misleading information.

==================================================

PHASE 5 — TRADING CHART

==================================================

THIS IS CRITICAL.

Determine whether the chart is:

A. REAL MARKET DATA

or

B. SIMULATED DATA

or

C. STATIC DEMO DATA.

Inspect the actual JavaScript.

If it is simulated, NEVER market it as real-time live market data.

Clearly label:

"Educational simulation — not live market data"

or equivalent wording.

If the UI says "live", "real-time", or anything that could reasonably imply a live market feed while the data is simulated, correct the wording.

Do NOT invent a market-data API.

If a genuine market feed is desired, document exactly what external provider/API/credentials are required.

==================================================

PHASE 6 — CALCULATORS

==================================================

Audit every mathematical calculation.

Test:

- minimum values

- maximum values

- zero

- decimals

- negative input

- extremely large input

- empty input

- invalid input

- NaN

- Infinity

- mobile slider behavior

Manually calculate expected results independently.

Check:

- risk calculation

- position sizing

- reward

- risk/reward

- expectancy

- win rate

- investment projections

- ROI

Ensure the displayed results are mathematically correct.

Prevent impossible values.

Never allow NaN, Infinity, undefined or broken formatting to appear to users.

==================================================

PHASE 7 — FINANCIAL / INVESTMENT CLAIMS

==================================================

Because this is a stock-market education website, perform an especially careful review of:

- expected returns

- ROI claims

- trading income claims

- "multi-bagger" language

- success rates

- performance claims

- projected profits

- student results

- guaranteed-sounding statements

Do not invent or strengthen financial claims.

Clearly distinguish:

EDUCATIONAL EXAMPLE

from

ACTUAL PERFORMANCE

from

PROJECTED/ASSUMED RESULT.

Where appropriate, add clear assumptions.

Ensure the disclaimer does not contradict the surrounding marketing.

The website must not give customers the impression that profits are guaranteed.

Do not make legal conclusions.

Instead, flag areas that should be reviewed by the business's legal/compliance adviser before publication.

==================================================

PHASE 8 — CUSTOMER DATA PRIVACY

==================================================

Map every piece of customer information collected.

Examples:

- name

- phone

- WhatsApp number

- email

- preferences

- registration information

- analytics data

For every field determine:

WHY IS IT COLLECTED?

WHERE IS IT SENT?

WHO CAN ACCESS IT?

HOW LONG IS IT STORED?

IS IT NECESSARY?

Minimize unnecessary data collection.

Do not expose customer data in:

- URL parameters

- console logs

- HTML

- public JavaScript

- localStorage unless necessary

- publicly accessible files

Remove unnecessary logging.

Never expose secrets.

==================================================

PHASE 9 — SECURITY AUDIT

==================================================

Perform a professional web security audit.

Check for:

1. XSS

2. DOM XSS

3. HTML injection

4. unsafe innerHTML

5. unsafe eval

6. unsafe dynamic script loading

7. exposed API keys

8. exposed secrets

9. insecure external resources

10. unsafe URL handling

11. malicious redirect possibilities

12. form injection

13. CSRF where relevant

14. open redirects

15. iframe security

16. third-party script risks

17. dependency vulnerabilities

18. unsafe localStorage

19. unsafe cookies

20. information leakage

21. console leakage

22. source-map leakage

23. debug code

24. development endpoints

25. hardcoded credentials

26. insecure webhook endpoints if any

27. backend authorization if any

28. database exposure if any

Check every external resource.

Use HTTPS wherever possible.

Add appropriate security attributes such as:

- rel="noopener noreferrer"

- iframe sandbox where appropriate

- appropriate referrer policy

- appropriate CSP/security headers where the hosting platform permits them

Do not add security controls that break legitimate functionality.

==================================================

PHASE 10 — DEPENDENCY SECURITY

==================================================

Inspect:

- Tailwind

- Font Awesome

- Chart.js

- Google Fonts

- YouTube

- Google Maps

- all npm packages if package.json exists

- all CDN dependencies

Identify:

- outdated dependencies

- known vulnerabilities

- unnecessary dependencies

- unnecessary third-party scripts

Do not blindly upgrade everything.

Upgrade only when compatibility is understood.

Run available security audits.

==================================================

PHASE 11 — MOBILE AUDIT

==================================================

Test every section at:

- 320px

- 360px

- 375px

- 390px

- 414px

- 768px

- 1024px

- desktop widths

Check:

- horizontal overflow

- clipped text

- buttons

- menus

- modals

- forms

- charts

- calculators

- YouTube

- map

- typography

- spacing

- tap targets

- scrolling

No horizontal scrolling should occur unless intentionally required.

Every important button must be usable with a finger.

==================================================

PHASE 12 — ACCESSIBILITY

==================================================

Audit:

- semantic HTML

- heading hierarchy

- alt text

- form labels

- keyboard navigation

- focus states

- modal focus trapping

- ESC to close

- button semantics

- color contrast

- screen-reader behavior

- aria attributes

- error messages

- reduced-motion support

Images must have accurate alt text.

Do NOT use fake alt text that claims a stock image is a real person.

==================================================

PHASE 13 — IMAGE / CONTENT AUTHENTICITY

==================================================

Audit every image.

Determine:

- actual photo

- stock photo

- placeholder

- generated image

If an image is a stock image but is labeled as the founder or staff member, do not leave it misleadingly labeled.

Flag it for replacement with the actual authorized photograph.

Do the same for:

- testimonials

- student photos

- certificates

- awards

- logos

- Google ratings

- student numbers

Never fabricate social proof.

==================================================

PHASE 14 — TESTIMONIALS & TRUST

==================================================

Audit all testimonials.

Do not assume they are real.

Classify:

VERIFIED BY BUSINESS

UNVERIFIED

PLACEHOLDER

UNKNOWN

Do not invent verification.

If testimonials are not verified, recommend replacing them with genuine customer-approved testimonials.

Do not manufacture names or quotes.

==================================================

PHASE 15 — GOOGLE MAPS / BUSINESS INFORMATION

==================================================

Check consistency of:

- academy name

- address

- phone

- WhatsApp

- YouTube

- location

- map

No conflicting business information.

If the map location cannot be verified automatically, mark it:

REQUIRES BUSINESS VERIFICATION

Do not invent coordinates.

==================================================

PHASE 16 — SEO

==================================================

Implement a professional SEO foundation.

Check/add where appropriate:

- title

- meta description

- canonical

- Open Graph

- social sharing metadata

- proper headings

- descriptive image alt text

- LocalBusiness structured data

- Organization structured data where appropriate

- course structured data where appropriate

- robots.txt

- sitemap

- favicon

- clean URLs

Do not use fake review schema or fake ratings.

Structured data must represent genuine information only.

Target relevant local searches naturally, such as:

- stock market classes in Vellore

- stock market training Vellore

- options trading classes Vellore

- price action course Vellore

Do not keyword-stuff.

==================================================

PHASE 17 — PERFORMANCE

==================================================

Audit:

- page load

- JavaScript size

- image size

- fonts

- CDN dependencies

- YouTube embeds

- Google Maps

- Chart.js

- layout shifts

- render blocking resources

Optimize:

- lazy loading

- image dimensions

- iframe loading

- script loading

- unnecessary JavaScript

- repeated resources

Do not sacrifice functionality.

==================================================

PHASE 18 — ERROR / LOADING / EMPTY STATES

==================================================

Every dynamic feature must have:

LOADING

SUCCESS

EMPTY

ERROR

RETRY

states where applicable.

Never leave a button apparently frozen.

Never display blank space when a network request fails.

Never display "Success" when the backend failed.

==================================================

PHASE 19 — EXTERNAL SERVICES

==================================================

Create an EXTERNAL_SERVICES.md containing:

SERVICE

PURPOSE

CURRENT STATUS

REQUIRED API KEY?

REQUIRED ACCOUNT?

REQUIRED CONFIGURATION?

TESTED?

PRODUCTION READY?

Examples:

- YouTube

- Google Maps

- Chart.js

- WhatsApp

- email

- SMS

- analytics

- lead management

- payment provider if introduced

Never put secret keys in frontend source code.

==================================================

PHASE 20 — REAL USER JOURNEY TESTING

==================================================

Simulate complete customer journeys.

JOURNEY A — New visitor

Landing

→ read academy information

→ courses

→ syllabus

→ contact

→ WhatsApp

JOURNEY B — Masterclass

Landing

→ reserve masterclass

→ enter details

→ validation

→ submit

→ confirmation

→ actual lead delivery

JOURNEY C — eBook

Landing

→ eBook

→ enter details if required

→ submit

→ actual file/download

JOURNEY D — Course discovery

Courses

→ filter

→ select course

→ syllabus

→ fee

→ contact/enrollment

JOURNEY E — Mobile

Open website on phone

→ menu

→ course

→ calculator

→ masterclass

→ WhatsApp

→ map

Document every failure.

==================================================

PHASE 21 — TRUST CHECK

==================================================

Perform a special "would a first-time customer trust this?" audit.

Look for:

- fake-looking counters

- fake testimonials

- stock photos presented as real people

- exaggerated claims

- inconsistent information

- broken buttons

- fake success messages

- dead links

- suspicious redirects

- misleading charts

- unexplained financial projections

- unclear pricing

- unclear refund/cancellation information

- missing contact details

- missing business identity

- spelling/grammar mistakes

- poor mobile behavior

- excessive popups

- aggressive marketing

The goal is NOT to make the website more persuasive.

The goal is to make it MORE CREDIBLE, TRANSPARENT AND TRUSTWORTHY.

==================================================

PHASE 22 — BUSINESS INFORMATION

==================================================

Create a checklist of information that must be confirmed by the owner:

- founder identity

- actual founder photo

- academy address

- phone

- WhatsApp

- YouTube channel

- course fees

- course schedules

- refund policy

- terms

- privacy policy

- testimonials

- student count

- ratings

- years of experience

- certifications

- awards

- affiliations

- performance claims

Never invent missing information.

Use clearly marked placeholders only where necessary.

==================================================

PHASE 23 — CODE QUALITY

==================================================

Clean:

- dead code

- duplicate functions

- unused CSS

- unused JavaScript

- console.log

- TODO

- FIXME

- placeholder logic

- fake API calls

- unreachable code

- duplicated event handlers

- inconsistent naming

Do not rewrite working code unnecessarily.

Make the smallest safe change that fixes each real issue.

==================================================

PHASE 24 — TESTING

==================================================

After modifications run every available test.

At minimum:

- syntax checks

- JavaScript execution checks

- lint

- build

- dependency audit

- link checks where possible

- responsive checks

- functional tests

Create:

TEST_REPORT.md

with:

TEST

RESULT

EVIDENCE

FAILURE

FIX

REMAINING ISSUE

Never write "PASS" without evidence.

==================================================

PHASE 25 — FINAL PRODUCTION READINESS MATRIX

==================================================

Create:

PRODUCTION_READINESS_REPORT.md

Use this exact classification:

🟢 VERIFIED WORKING

🟡 IMPLEMENTED BUT NEEDS REAL-WORLD VERIFICATION

🟠 PARTIAL

🔴 BROKEN

⚫ MISSING

🔵 BLOCKED BY EXTERNAL CONFIGURATION

Evaluate:

1. Homepage

2. Navigation

3. Mobile menu

4. Founder section

5. Courses

6. Course filters

7. Syllabus

8. YouTube

9. Live chart

10. Calculator

11. Investment calculator

12. Masterclass

13. eBook

14. WhatsApp

15. Phone

16. Google Maps

17. Testimonials

18. SEO

19. Accessibility

20. Performance

21. Security

22. Privacy

23. External services

24. Customer data

25. Error handling

26. Mobile

27. Business credibility

28. Financial claims

29. Production deployment readiness

==================================================

PHASE 26 — PRIORITY SYSTEM

==================================================

Classify findings:

P0 — Critical security/data/customer-trust issue

P1 — Major broken customer journey

P2 — Important functionality/integrity problem

P3 — UX/accessibility/performance issue

P4 — Cosmetic/polish

Fix in this order:

P0

→ P1

→ P2

→ P3

→ P4

Do not spend time polishing a button animation while a customer registration form silently loses leads.

==================================================

PHASE 27 — AUTONOMOUS WORK RULE

==================================================

Do not stop after finding problems.

For every issue ask:

"Can I safely fix this myself?"

If YES:

→ fix it

→ test it

→ document it.

If NO because credentials/business decisions/external account are required:

→ document exactly what is required

→ do not fabricate completion.

Do not repeatedly ask for permission for safe local investigation, coding, testing, documentation, or cleanup.

Do not make irreversible production changes without explicit authorization.

==================================================

PHASE 28 — NO FAKE COMPLETION

==================================================

This rule is absolute.

NEVER SAY:

"Working"

when you only mean:

"The button exists."

NEVER SAY:

"Live"

when it is simulated.

NEVER SAY:

"Registration successful"

when the backend did not accept the registration.

NEVER SAY:

"Payment working"

without payment verification.

NEVER SAY:

"Real-time"

without a real-time data source.

NEVER SAY:

"Verified testimonial"

without evidence.

NEVER SAY:

"Secure"

without documenting what was actually checked.

Use:

VERIFIED

UNVERIFIED

PARTIAL

BLOCKED

MISSING

BROKEN

instead.

==================================================

PHASE 29 — FINAL REPORT

==================================================

At the end give me a concise executive summary followed by complete evidence.

FORMAT:

# TRADING ZONE VELLORE — FINAL PRODUCTION REPORT

## 1. Executive Summary

Overall status:

PRODUCTION READY / NOT PRODUCTION READY

Explain why.

## 2. What Works

List verified working features.

## 3. What Was Broken

For every bug:

Problem

Root cause

Fix

Test

## 4. What Is Missing

Feature

Why required

What is needed

## 5. Security Audit

Critical findings

High findings

Medium findings

Low findings

Fixed findings

Remaining findings

## 6. Customer Trust Audit

List every trust issue.

## 7. Customer Data & Privacy

What is collected

Where it goes

What remains uncertain

## 8. Financial/Trading Claims

List all claims requiring owner/compliance verification.

## 9. Mobile Audit

Results for phone/tablet/desktop.

## 10. SEO Audit

Implemented

Missing

Recommendations

## 11. Performance Audit

Results

Problems

Fixes

## 12. External Services

Service

Status

Required configuration

## 13. Testing

Every test performed and result.

## 14. Remaining Blockers

Only genuine blockers.

## 15. Exact Owner Actions Required

Give me a simple checklist.

## 16. Final Feature Matrix

Feature | Status | Evidence | Remaining Action

## 17. FINAL VERDICT

Give a factual production-readiness conclusion.

Do NOT give a fake "100% complete" score.

Do NOT hide unresolved issues.

Do NOT call the site production-ready if critical customer, security, data, or functionality issues remain.

==================================================

FINAL PRINCIPLE

==================================================

Build a website that a first-time customer can trust because:

- information is honest

- buttons work

- forms actually submit

- downloads actually download

- contact information is accurate

- testimonials are genuine

- images are authentic

- financial claims are clearly qualified

- customer data is protected

- failures are handled honestly

- mobile works

- security is taken seriously

- nothing important is fake

CUSTOMER TRUST > MARKETING > DESIGN > POLISH.

Start by inspecting the complete project.

Do not guess.

Do not fabricate.

Do not skip difficult areas.

Do not stop at visual inspection.

Trace the actual code and actual data flow.

Then fix everything safely fixable and produce the complete report.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://genu-code.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4e2274d5-369d-4969-be46-8403c19482ed).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
