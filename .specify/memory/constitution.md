# Bookmark App Constitution

## Core Principles

### I. Modular & Layered Architecture

Every component has a single responsibility and clean boundaries:

* **Database Layer**: Schema definition (`db/init.ts`), connection management (`db/db.ts`), migrations, and database initialization.
* **Service Layer**: Business logic and database operations (`services/bookmark.service.ts`).
* **Controller Layer**: HTTP request handling, validation, authentication/authorization checks, and response formatting (`controllers/bookmark.controller.ts`).
* **Server/Router**: Bun HTTP server routing and entrypoint (`index.ts`).
* **Telegram Integration Layer**: Telegram update handling, command parsing, authorization, and integration with the shared service layer.
* **Frontend Layer**: UI components, client-side state, API communication, accessibility behavior, and presentation logic.

Every layer MUST have a clear responsibility and MUST NOT duplicate business logic belonging to another layer.

The Telegram bot MUST reuse the same bookmark business logic as the Web API through the service layer whenever practical.

Preferred architecture:

```text
Web UI ────────────────┐
                       │
                       ▼
                 BookmarkService
                       │
                       ▼
                    SQLite
                       ▲
                       │
Telegram Bot ──────────┘
```

Avoid unnecessary internal HTTP calls between Telegram and the local application when direct service-layer reuse is possible.

---

### II. Strict Type Safety (TypeScript)

TypeScript strict mode is enforced across the entire codebase.

All of the following MUST be explicitly typed:

* Request payloads.
* Query parameters.
* Path parameters.
* Database records.
* Service inputs and outputs.
* API responses.
* Telegram updates and commands.
* Configuration/environment variables where practical.

Avoid `any` types.

Prefer:

* interfaces
* type aliases
* discriminated unions
* type guards
* runtime validation followed by type narrowing

The project MUST NOT weaken TypeScript strictness to simplify implementation.

The implementation MUST NOT silence errors with `@ts-ignore`, `@ts-nocheck`, or unsafe casts unless there is a documented and justified reason.

---

### III. Secure & Robust Data Persistence (SQLite)

Database interactions must ensure data integrity and security:

* Use parameterized queries for all SQL statements to prevent SQL injection.
* Do not construct SQL statements by concatenating untrusted user input.
* Handle connection errors and constraint violations gracefully.
* Maintain idempotent migration and schema initialization scripts (`bun run db:migrate`).
* Preserve the existing Bun-native SQLite architecture.
* Avoid unnecessary ORM/database abstraction layers.

The persistence layer MUST remain compatible with:

```text
bun:sqlite
```

The implementation MUST NOT replace `bun:sqlite` with:

```text
sql.js
Drizzle
Prisma
better-sqlite3
```

or another persistence stack unless an explicit architectural decision is documented.

---

### IV. Predictable REST API Contracts

Endpoints must adhere to standard RESTful conventions:

* Use correct HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
* Return consistent status codes.
* Format JSON responses uniformly.
* Validate all external input.
* Do not expose internal implementation details or stack traces.

Required bookmark endpoints:

```text
GET    /bookmarks
POST   /bookmarks
GET    /bookmarks/:id
PUT    /bookmarks/:id
DELETE /bookmarks/:id
```

Health endpoint:

```text
GET /health
```

Recommended status codes:

* `200 OK` for successful reads, updates, and deletes.
* `201 Created` for successful creation.
* `400 Bad Request` for malformed or invalid input.
* `401 Unauthorized` for missing or invalid authentication.
* `403 Forbidden` for authenticated but unauthorized actions.
* `404 Not Found` for missing resources.
* `409 Conflict` for deterministic duplicate resources.
* `413 Payload Too Large` for oversized request bodies.
* `429 Too Many Requests` for rate-limited requests.
* `500 Internal Server Error` for unexpected server failures.

---

### V. Simplicity & Performance (Bun-native)

Leverage Bun's high-performance native capabilities:

* Utilize Bun's built-in HTTP server (`Bun.serve`) without unnecessary heavy web framework bloat.
* Keep dependencies minimal, focused, and performant.
* Prefer native Bun APIs where appropriate.
* Ensure fast startup.
* Ensure zero-friction development (`bun run dev`).
* Ensure easy database migration, seeding, and testing.

Do not introduce large frameworks or libraries when native Bun functionality is sufficient.

Avoid architectural complexity that does not provide clear product or security value.

---

## Additional Constraints & Standards

### Error Handling & Validation

Input validation is mandatory for all external data.

The system MUST validate:

* required fields
* URL format
* URL scheme
* URL length
* title length
* description length
* tag count
* tag length
* query parameters
* pagination values
* Telegram commands
* Telegram message content

Incoming JSON bodies MUST be size-limited.

Invalid input MUST return a clean and predictable error response.

The server MUST NOT crash because of malformed user input.

Never expose raw stack traces, database errors, filesystem paths, secrets, or internal implementation details to clients.

---

### Logging

* All incoming HTTP requests MUST be logged with `info` level.
* All errors MUST be logged with `error` level.
* All other non-essential internal actions MUST be logged with `debug` level.
* Important warnings SHOULD be logged with `warn` level when appropriate.

Request logs SHOULD contain:

* timestamp
* HTTP method
* path
* response status
* request duration
* request identifier

The system MUST NOT log:

* Telegram bot tokens
* passwords
* API keys
* webhook secrets
* authorization headers
* session secrets
* sensitive user data unnecessarily

Production error responses MUST remain safe and generic even when detailed diagnostics are logged internally.

---

### Documentation & Developer Experience

Maintain an up-to-date `README.md` documenting:

* project architecture
* database setup
* environment variables
* API endpoints
* query parameters
* data models
* Telegram setup
* Telegram commands
* development mode
* production webhook mode
* security considerations
* testing
* troubleshooting

The following files MUST exist when applicable:

```text
.env.example
README.md
```

The following scripts MUST work:

```text
bun install
bun run db:migrate
bun run db:seed
bun run dev
bun test
```

The project MUST NOT depend on undocumented manual setup steps for normal development.

---

# UI / UX Standards

### UX-001 — Product Character

The application MUST feel like a premium personal bookmark and knowledge workspace rather than a generic CRUD/admin dashboard.

The visual direction MUST prioritize:

* clarity
* strong typography
* intentional spacing
* high information density without clutter
* fast perceived performance
* obvious interaction states
* responsive behavior
* polished visual hierarchy

Avoid:

* generic dashboard templates
* unnecessary gradients
* excessive glassmorphism
* excessive decorative effects
* giant cards
* visually noisy interfaces
* unnecessary navigation complexity

The visual language should feel modern, technical, refined, calm, and intentional.

---

### UX-002 — Centralized Design System

The frontend MUST use centralized design tokens for:

* colors
* typography
* spacing
* border radius
* shadows
* elevation
* transitions
* focus states
* z-index layers

Prefer semantic variables such as:

```text
--color-background
--color-surface
--color-surface-elevated
--color-text-primary
--color-text-secondary
--color-border
--color-accent
--color-success
--color-warning
--color-danger
```

Repeated visual values SHOULD NOT be hardcoded throughout multiple components.

---

### UX-003 — Layout

The application SHOULD use a centered, readable application shell.

The interface SHOULD contain:

* application header
* primary search
* filter controls
* primary add-bookmark action
* bookmark result area
* responsive actions on mobile

The bookmark collection MUST remain the visual center of the product.

Core functionality MUST NOT be hidden behind unnecessary navigation layers.

---

### UX-004 — Bookmark Card / List Item

Every bookmark item SHOULD expose:

* title
* domain/hostname
* URL
* description when available
* tags
* creation date
* update date when relevant
* source indicator when applicable
* open action
* edit action
* delete action

The entire item MUST NOT become one giant ambiguous clickable surface.

Long URLs MUST be truncated safely without breaking layout.

The URL MUST remain visually distinguishable from the title.

---

### UX-005 — Information Density

The interface SHOULD remain useful with hundreds or thousands of bookmarks.

Prefer a compact and highly readable list/card system over excessively large cards.

Do not use fixed heights that cause text clipping or inaccessible content.

---

### UX-006 — Responsive Design

The UI MUST work on:

* mobile
* tablet
* desktop

Recommended breakpoints:

```text
mobile:  < 640px
tablet:  640px–1023px
desktop: 1024px+
```

On mobile:

* controls MUST remain thumb-friendly
* forms SHOULD use a single-column layout
* search MUST remain easy to access
* destructive actions MUST be difficult to trigger accidentally
* horizontal overflow MUST be avoided

---

### UX-007 — Interaction States

Every asynchronous operation MUST have clear states:

* idle
* loading
* success
* error
* empty
* disabled
* validation failure

Dedicated empty states MUST exist for:

* no bookmarks
* no search results
* no results for the current tag filter

Blank UI areas without explanation SHOULD be avoided.

---

### UX-008 — Add Bookmark Flow

The URL field MUST be the primary field.

Behavior:

1. URL is required.
2. URL is trimmed before validation.
3. Only allowed URL schemes are accepted.
4. Invalid URLs display inline validation errors.
5. Title, description, and tags are optional.
6. Enter SHOULD submit where appropriate.
7. Successful creation SHOULD update the visible list without a full page refresh.
8. Duplicate behavior MUST be deterministic.
9. Failed submissions SHOULD preserve user-entered values where practical.

---

### UX-009 — Edit Bookmark

The web UI MUST support editing:

* URL
* title
* description
* tags

The edit interaction MUST clearly distinguish:

* Save
* Cancel

---

### UX-010 — Delete Confirmation

Deleting a bookmark MUST require explicit confirmation.

The confirmation interaction MUST:

* identify the bookmark
* clearly distinguish destructive action
* support Escape
* manage keyboard focus
* return focus to the triggering control after closing

Delete-all MUST use a stronger confirmation mechanism than ordinary deletion.

---

### UX-011 — Search

Search MUST support:

* title
* description
* tags
* URL

Search SHOULD be debounced.

The frontend MUST prevent stale asynchronous responses from overwriting newer search results.

---

### UX-012 — Tag Filtering

Tags MUST be displayed as visually distinct chips/badges.

Selecting a tag SHOULD apply it as an active filter.

Active filters MUST be visually obvious.

The interface MUST provide an easy way to clear filters.

---

### UX-013 — Sorting & Pagination

The API MUST support bounded pagination.

Recommended defaults:

```text
default limit: 20
maximum limit: 100
```

The API MUST reject invalid pagination values.

The UI SHOULD support:

* newest first
* oldest first

Pagination behavior MUST remain predictable for large bookmark collections.

---

### UX-014 — Accessibility

The UI SHOULD target WCAG 2.2 AA principles.

All interactive controls MUST be keyboard accessible.

The application MUST provide:

* visible focus indicators
* accessible input labels
* meaningful button names
* keyboard-operable dialogs
* usable validation messages
* sufficient contrast
* accessible status feedback

Icon-only buttons MUST have accessible names.

---

### UX-015 — Motion

Animations MUST be subtle and functional.

Normal interface transitions SHOULD generally remain approximately within 120–220ms unless a specific interaction requires otherwise.

Respect:

```text
prefers-reduced-motion
```

Motion MUST NOT replace clear state communication.

---

# API Standards

### API-001 — Response Envelope

JSON API responses SHOULD use a consistent structure.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "BOOKMARK_NOT_FOUND",
    "message": "Bookmark not found"
  }
}
```

Do not return inconsistent response shapes without justification.

---

### API-002 — Query Validation

The API MUST validate:

```text
limit
offset
search
tag
```

Rules:

* `limit` MUST be a positive integer.
* `limit` MUST not exceed the configured maximum.
* `offset` MUST be a non-negative integer.
* invalid query parameters MUST return `400 Bad Request`.

---

### API-003 — URL Validation

Bookmark URLs MUST:

* be valid URLs
* use `http` or `https`
* reject dangerous schemes such as:

  * `javascript:`
  * `data:`
  * `file:`
  * similar non-web schemes
* respect a maximum URL length
* be normalized/canonicalized before duplicate comparison

Validation MUST use URL parsing and explicit policy checks rather than relying only on a regex.

---

### API-004 — Duplicate Bookmarks

Duplicate handling MUST be deterministic.

Preferred behavior:

1. normalize the URL
2. compare against an existing canonical URL
3. prevent duplicate creation
4. return `409 Conflict`
5. provide the existing bookmark identifier where safe

The application MUST NOT silently create unlimited duplicates.

---

### API-005 — Input Limits

Define maximum lengths for:

```text
url
title
description
tags
search
tag query
```

Reject oversized inputs.

Do not allow unbounded user-controlled strings.

---

# Data Model Standards

### DATA-001 — Bookmark

The Bookmark entity MUST include:

```text
id
url
title
description
tags
created_at
updated_at
```

---

### DATA-002 — Source Tracking

The system SHOULD track the source of bookmark creation.

Supported values:

```text
web
telegram
```

The design SHOULD allow future sources without redesigning the service architecture.

---

### DATA-003 — Telegram Metadata

Telegram-originated bookmarks SHOULD store only the minimum metadata required for traceability, such as:

```text
telegram_user_id
telegram_chat_id
telegram_message_id
```

Unnecessary personal data MUST NOT be stored.

---

### DATA-004 — Timestamp Consistency

Database timestamps MUST be generated consistently.

API responses MUST use one documented timestamp format.

---

### DATA-005 — Tag Normalization

Tags MUST be normalized by:

* trimming whitespace
* removing empty tags
* removing duplicates
* enforcing maximum tag count
* enforcing maximum tag length

The project MUST use one canonical tag representation.

If comma-separated tags remain the MVP representation, parsing and filtering MUST avoid ambiguous partial matches where practical.

---

# Security Standards

### SEC-001 — Threat Model

The implementation MUST consider:

* SQL injection
* stored XSS
* unauthorized API access
* brute-force attempts
* Telegram webhook spoofing
* replayed Telegram updates
* duplicate Telegram messages
* Telegram token leakage
* oversized payload attacks
* denial-of-service risks
* dangerous URLs
* accidental destructive actions
* secret leakage through logs
* path traversal
* unsafe static file serving
* SSRF if future server-side URL fetching is introduced

Security implementation SHOULD align with OWASP ASVS principles where practical.

---

### SEC-002 — No Hardcoded Secrets

The implementation MUST NOT hardcode:

* passwords
* Telegram bot tokens
* webhook secrets
* API keys
* session secrets

Secrets MUST be provided using environment variables or another secure secret-management mechanism.

The existing hardcoded administrative password MUST NOT exist in production code.

---

### SEC-003 — Authentication

If the application is exposed outside localhost, protected operations MUST require authentication.

Administrative/destructive operations MUST NOT rely on an undocumented hardcoded password.

For a personal single-user deployment, a minimal configurable authentication mechanism is acceptable.

---

### SEC-004 — Authorization

Authentication and authorization MUST remain separate concepts.

A valid authenticated identity MUST NOT automatically imply unrestricted administrative access unless explicitly configured.

---

### SEC-005 — Telegram Authorization

The Telegram bot MUST NOT trust every Telegram user by default.

A personal bookmark deployment MUST support an allowlist configured through:

```text
TELEGRAM_ALLOWED_USER_IDS
```

Unauthorized Telegram users MUST NOT be able to:

* create bookmarks
* delete bookmarks
* execute administrative commands

---

### SEC-006 — XSS Prevention

All bookmark data is untrusted input.

The frontend MUST NOT render user-controlled content using unsafe HTML injection.

Prefer:

```text
textContent
```

or equivalent safe DOM APIs for text.

Links MUST use validated HTTP/HTTPS URLs.

The frontend MUST NOT allow attacker-controlled HTML to become executable markup.

---

### SEC-007 — Security Headers

The server SHOULD provide appropriate security headers, including where appropriate:

```text
Content-Security-Policy
X-Content-Type-Options: nosniff
Referrer-Policy
frame-ancestors / clickjacking protection
```

---

### SEC-008 — Request Size Limits

JSON request bodies MUST have a configurable maximum size.

Oversized requests MUST be rejected safely.

---

### SEC-009 — Rate Limiting

Rate limiting SHOULD be applied to abuse-sensitive operations, including:

* bookmark creation
* bookmark deletion
* delete-all
* authentication
* Telegram message processing

Rate limits SHOULD be configurable.

---

### SEC-010 — Destructive Operations

Delete-all MUST:

* require authentication
* require authorization
* avoid hardcoded passwords
* be logged
* be protected against accidental triggering
* require explicit confirmation at the UI layer

---

# SSRF Safety

### SSRF-001

The application MUST NOT fetch arbitrary bookmark URLs from the server simply to display bookmarks.

The MVP SHOULD store and display URLs without server-side fetching.

---

### SSRF-002

Any future feature involving:

* page title extraction
* metadata previews
* screenshots
* favicon retrieval
* page-content extraction

MUST receive an SSRF security review before implementation.

Such functionality MUST consider:

* localhost
* private IP ranges
* link-local addresses
* cloud metadata endpoints
* IPv4
* IPv6
* DNS rebinding
* redirect bypasses
* connection timeouts
* read timeouts
* response-size limits
* allowed protocols

Protected server-side fetches SHOULD avoid blindly following redirects.

---

# Telegram Integration Standards

### TG-001 — Shared Service Layer

Telegram MUST use the same `BookmarkService` business logic as the Web API.

Preferred:

```text
Telegram Update
      │
      ▼
Telegram Handler
      │
      ▼
BookmarkService
      │
      ▼
SQLite
```

Do not duplicate bookmark creation/update logic inside Telegram handlers.

---

### TG-002 — Configuration

Support configuration through environment variables:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_MODE
TELEGRAM_ALLOWED_USER_IDS
TELEGRAM_WEBHOOK_SECRET
TELEGRAM_WEBHOOK_URL
```

Only required variables for the selected operating mode need to be mandatory.

---

### TG-003 — Development & Production

Local development MAY use Telegram long polling.

Production webhook deployment SHOULD use Telegram webhooks.

The application MUST clearly document which mode is active.

---

### TG-004 — Webhook Verification

Webhook mode MUST:

* configure a secret token
* verify the Telegram secret header
* reject invalid secret tokens
* avoid relying only on an obscure URL path

---

### TG-005 — Update Idempotency

Telegram updates MUST be processed idempotently.

The system MUST prevent the same Telegram update from creating duplicate bookmarks.

A persistent mechanism keyed by Telegram `update_id` SHOULD be used.

---

### TG-006 — URL Extraction

The bot MUST support:

```text
/add https://example.com
```

and plain messages containing URLs.

Where Telegram provides message entities, the implementation SHOULD use them rather than relying exclusively on naive regular expressions.

---

### TG-007 — Commands

At minimum support:

```text
/start
/help
/add <url>
```

The architecture SHOULD make it easy to introduce future commands without rewriting the entire Telegram message processor.

---

### TG-008 — Telegram Feedback

The bot MUST provide concise user feedback for:

* successful bookmark creation
* invalid URL
* duplicate bookmark
* unauthorized user
* malformed command
* internal failure

---

### TG-009 — Telegram Rate Limiting

Telegram operations SHOULD be rate-limited per:

* Telegram user
* Telegram chat

This protects against message storms and abuse.

---

### TG-010 — Secret Protection

Telegram tokens and webhook secrets MUST NEVER appear in:

* source code
* frontend JavaScript
* API responses
* logs
* error messages
* documentation examples

The repository MUST contain placeholders only.

---

# Testing Standards

### TEST-001 — Service Tests

Tests MUST cover:

* create
* get by ID
* list
* search
* tag filtering
* update
* delete
* delete all
* duplicate detection
* invalid data

---

### TEST-002 — API Integration Tests

Test:

* every endpoint
* successful requests
* malformed JSON
* missing required fields
* invalid IDs
* invalid query parameters
* invalid URL schemes
* oversized payloads
* authentication failures
* authorization failures
* duplicate creation
* error responses

---

### TEST-003 — Telegram Tests

Test:

* `/start`
* `/help`
* valid `/add`
* plain URL message
* invalid URL
* duplicate URL
* unauthorized user
* duplicate update delivery
* malformed update
* webhook secret validation
* internal service failure

---

### TEST-004 — Security Regression Tests

The test suite MUST include defensive tests for:

* stored XSS payloads
* dangerous URL schemes
* SQL injection payloads
* unauthorized destructive requests
* Telegram webhook spoofing
* replayed Telegram updates
* oversized requests
* excessive request rate
* invalid authentication

Malicious input MUST be treated strictly as data.

---

# Performance Standards

### PERF-001

The UI MUST remain responsive with at least hundreds of bookmarks.

---

### PERF-002

Initial application load SHOULD remain within the established 2-second target under normal local deployment conditions.

---

### PERF-003

API queries MUST use bounded pagination.

---

### PERF-004

Database queries SHOULD avoid unnecessary full-table scans where practical.

Appropriate indexes SHOULD be introduced for commonly used filtering and ordering operations.

---

### PERF-005

The frontend SHOULD minimize:

* unnecessary DOM work
* duplicated rendering
* repeated API calls
* stale requests
* unnecessary state updates

---

# Developer Experience

### DX-001

The following commands MUST work from a clean checkout:

```text
bun install
bun run db:migrate
bun run db:seed
bun run dev
bun test
```

---

### DX-002

The repository SHOULD include:

```text
.env.example
README.md
```

The `.env.example` file MUST contain placeholders only.

---

### DX-003

README MUST document:

* setup
* architecture
* database
* migrations
* API
* UI behavior
* environment variables
* Telegram integration
* Telegram commands
* webhook deployment
* security
* testing
* troubleshooting

---

### DX-004

The repository MUST NOT contain undocumented placeholders such as:

```text
TODO
FIXME
temporary password
implement later
mock production logic
```

unless explicitly identified as out-of-scope.

---

# AI Agent Implementation Guardrails

### AI-001 — Inspect Before Modify

Before modifying any existing file, the coding agent MUST:

1. inspect the current repository structure
2. inspect relevant existing files
3. identify working behavior
4. compare the current implementation against the Constitution
5. identify affected interfaces
6. determine the smallest necessary change

The agent MUST NOT modify files before understanding the existing architecture.

---

### AI-002 — Preserve Working Infrastructure

The agent MUST preserve compatible existing implementations.

Do not rewrite working infrastructure merely because another architecture is preferred.

In particular:

```text
bun:sqlite
Bun.serve
existing migration system
existing service layer
```

MUST be preserved unless a documented architectural decision explicitly requires otherwise.

---

### AI-003 — Minimal & Reversible Changes

Prefer:

* minimal changes
* incremental changes
* isolated changes
* reversible changes

Avoid broad rewrites.

---

### AI-004 — No Silent Architecture Changes

Before introducing any significant architectural change, the agent MUST explain:

* why it is necessary
* what files are affected
* what dependencies are added
* what behavior changes
* what risks exist

---

### AI-005 — No Dependency Creep

Do not introduce new libraries unless they provide clear value that cannot reasonably be achieved with existing Bun/TypeScript capabilities.

Every new dependency SHOULD have an explicit justification.

---

### AI-006 — No Unsafe Shortcuts

The agent MUST NOT:

* hardcode secrets
* hardcode passwords
* weaken authentication
* disable validation
* remove security controls
* use `any` merely to silence TypeScript errors
* use `@ts-ignore` merely to bypass compiler errors
* inject untrusted HTML
* replace safe SQL with string concatenation
* bypass tests to force completion

---

### AI-007 — Keep Documentation in Sync

Any change to:

* API
* environment variables
* database schema
* Telegram configuration
* commands
* development workflow
* public behavior

MUST update the relevant documentation.

---

### AI-008 — Tests Follow Behavior

When behavior changes, tests MUST be added or updated accordingly.

A feature MUST NOT be considered complete solely because the server starts successfully.

---

## Definition of Done

A feature is considered complete only when:

1. Web UI works on desktop.
2. Web UI works on mobile.
3. Bookmarks can be created.
4. Bookmarks can be viewed.
5. Bookmarks can be searched.
6. Bookmarks can be filtered by tag.
7. Bookmarks can be edited.
8. Bookmarks can be deleted.
9. Duplicate behavior is deterministic.
10. API endpoints follow the documented REST contract.
11. API input validation exists.
12. Telegram can create bookmarks.
13. Telegram access is authorized.
14. Telegram duplicate updates are safely handled.
15. No hardcoded secrets exist.
16. No hardcoded administrative password exists.
17. User-controlled content is rendered safely.
18. Dangerous URL schemes are rejected.
19. Request sizes are bounded.
20. Abuse-sensitive operations have appropriate rate controls.
21. Errors are handled without crashing the server.
22. API responses are consistent.
23. Structured logging exists.
24. `/health` exists.
25. Database migrations are idempotent.
26. Tests cover normal and abnormal flows.
27. Security regression tests exist.
28. README is complete.
29. `.env.example` is complete.
30. TypeScript strict mode remains enabled.
31. No unjustified `any` is introduced.
32. Bun-native architecture is preserved.
33. Existing `bun:sqlite` persistence is not replaced without explicit architectural justification.
34. No unnecessary framework or dependency is introduced.
35. UI design follows the project design system.
36. Accessibility requirements are respected.
37. Responsive behavior is verified.
38. Telegram and Web share the same bookmark business logic.

---

## Governance

The Constitution supersedes all other informal development practices.

Amendments require:

1. Updating this document.
2. Documenting the reason for the amendment.
3. Reviewing backward compatibility.
4. Defining migration steps when required.
5. Updating tests and documentation when behavior changes.

Complexity must be justified against YAGNI principles.

Security, accessibility, maintainability, and user experience requirements MAY justify additional complexity when they provide clear measurable value.

---

**Version**: 1.1.0 | **Ratified**: 2026-09-17 | **Last Amended**: 2026-09-17
