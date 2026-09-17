

# 🔖 Bookmark Vault


<p align="center">
  <strong>A developer-focused bookmark management system built for the Spec-Driven Development era.</strong>
</p>

<p align="center">
  Built with <strong>Bun</strong> · <strong>TypeScript</strong> · <strong>SQLite</strong> · <strong>REST</strong> · <strong>GitHub Spec Kit</strong>
</p>

<p align="center">
  <a href="https://github.com/alishojaeix/bookmark-vault">
    <img src="https://img.shields.io/github/stars/alishojaeix/bookmark-vault?style=for-the-badge&logo=github&label=STARS" alt="GitHub Stars">
  </a>
  <a href="https://github.com/alishojaeix/bookmark-vault/network/members">
    <img src="https://img.shields.io/github/forks/alishojaeix/bookmark-vault?style=for-the-badge&logo=github&label=FORKS" alt="GitHub Forks">
  </a>
  <img src="https://img.shields.io/badge/VERSION-v0.1.0-7C3AED?style=for-the-badge" alt="Version 0.1.0">
  <img src="https://img.shields.io/badge/STATUS-ACTIVE%20DEVELOPMENT-F59E0B?style=for-the-badge" alt="Active Development">
</p>

<p align="center">
  <a href="https://bun.sh/">
    <img src="https://img.shields.io/badge/BUN-RUNTIME-F9F1E1?style=flat-square&logo=bun&logoColor=black" alt="Bun">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TYPESCRIPT-STRICT-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
  <a href="https://www.sqlite.org/">
    <img src="https://img.shields.io/badge/SQLITE-NATIVE-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite">
  </a>
  <img src="https://img.shields.io/badge/API-REST-009688?style=flat-square" alt="REST API">
  <a href="https://github.com/github/spec-kit">
    <img src="https://img.shields.io/badge/SPEC%20KIT-SPEC--DRIVEN-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Spec Kit">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ARCHITECTURE-LAYERED-06B6D4?style=flat-square" alt="Layered Architecture">
  <img src="https://img.shields.io/badge/PERSISTENCE-BUN%20SQLITE-84CC16?style=flat-square" alt="Bun SQLite">
  <img src="https://img.shields.io/badge/DEVELOPMENT-AI%20ASSISTED-8B5CF6?style=flat-square" alt="AI Assisted Development">
  <img src="https://img.shields.io/badge/ROADMAP-IN%20PROGRESS-F97316?style=flat-square" alt="Roadmap">
</p>

---

## ⚡ What is Bookmark Vault?

**Bookmark Vault** is a lightweight, developer-oriented bookmark management system designed to evolve into a personal knowledge workspace.

The project starts with a deliberately small backend foundation and is being developed incrementally around a **specification-first workflow**.

The current foundation provides:

* 🔖 Bookmark CRUD
* 🔎 Search
* 🏷️ Tag filtering
* 📄 Pagination
* 💾 Native SQLite persistence
* ⚡ Bun runtime
* 🧠 Strict TypeScript direction
* 🌐 REST API
* ❤️ Health monitoring
* 📐 Spec-driven project structure
* 🤖 AI-assisted development workflow

> 🚧 **Bookmark Vault is an actively evolving project.**
>
> `v0.1.0` establishes the backend foundation. Web UI, Telegram integration, automated testing, security hardening, and production features are planned for upcoming releases.

---

# 🧬 Project DNA

```text
                         ┌──────────────────────┐
                         │    Product Idea      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Specify        │
                         │   Define the WHAT    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │        Plan          │
                         │   Design the HOW     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │        Tasks         │
                         │ Break work into steps│
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Implement      │
                         │      Build it       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Converge       │
                         │ Verify & close gaps │
                         └──────────────────────┘
```

Bookmark Vault uses **GitHub Spec Kit** as part of its development methodology.

Spec Kit's current documentation describes Spec-Driven Development as a process where specifications, planning, tasks, implementation, and convergence provide structured context for coding agents.

🔗 **Official Spec Kit:**
https://github.github.com/spec-kit/

---

# 🧠 Why Spec-Driven Development?

Instead of:

```text
Idea
 ↓
AI Prompt
 ↓
Code
 ↓
Something breaks
 ↓
Another prompt
 ↓
More code
 ↓
Architecture drift
```

This project aims for:

```text
Idea
 ↓
Specification
 ↓
Clarification
 ↓
Plan
 ↓
Tasks
 ↓
Implementation
 ↓
Verification
 ↓
Convergence
```

The goal is to keep **intent ahead of implementation**.

---

# 🛠️ Technology Stack

| Technology             | Role                              |
| ---------------------- | --------------------------------- |
| 🥟 **Bun**             | Runtime & development environment |
| 🔷 **TypeScript**      | Application language              |
| 🗄️ **SQLite**         | Persistent storage                |
| ⚡ **bun:sqlite**       | Native SQLite integration         |
| 🌐 **REST**            | HTTP API                          |
| 📐 **GitHub Spec Kit** | Specification-driven development  |
| 🤖 **Hermes**          | AI-assisted engineering workflow  |
| 🐙 **GitHub**          | Version control & collaboration   |

---

# 🏗️ Architecture

The current system intentionally uses a lightweight layered architecture.

```text
┌─────────────────────────────────────────────┐
│                 HTTP SERVER                 │
│                  Bun.serve                  │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                CONTROLLERS                  │
│       Request parsing / HTTP responses      │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 SERVICES                    │
│           Bookmark business logic           │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                  DATABASE                   │
│                bun:sqlite                   │
└─────────────────────────────────────────────┘
```

### Design Principle

> **Keep the core small. Keep responsibilities separated. Add complexity only when the product requires it.**

---

# 📂 Project Structure

```text
bookmark-vault/
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md
│   │
│   ├── integrations/
│   ├── scripts/
│   ├── templates/
│   └── workflows/
│
├── specs/
│   └── 001-ui-and-backend-api/
│       └── spec.md
│
├── src/
│   ├── controllers/
│   │   └── bookmark.controller.ts
│   │
│   ├── db/
│   │   ├── db.ts
│   │   └── init.ts
│   │
│   ├── services/
│   │   └── bookmark.service.ts
│   │
│   ├── scripts/
│   │   └── seed.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── index.ts
│
├── .gitignore
├── package.json
├── bun.lock
├── tsconfig.json
└── README.md
```

---

# 🚀 Quick Start

## Requirements

* [Bun](https://bun.sh/)
* Git

Check Bun:

```bash
bun --version
```

---

## Clone

```bash
git clone https://github.com/alishojaeix/bookmark-vault.git
cd bookmark-vault
```

---

## Install

```bash
bun install
```

---

## Initialize SQLite

```bash
bun run src/db/init.ts
```

This creates the local SQLite database and initializes the required schema.

---

## Start Development Server

```bash
bun run dev
```

---

# ❤️ Health Check

The API exposes a lightweight health endpoint:

```http
GET /health
```

Example:

```json
{
  "success": true,
  "message": "Bookmark API is running"
}
```

---

# 🌐 REST API

## Get bookmarks

```http
GET /bookmarks
```

Query parameters:

```text
search
tag
limit
offset
```

Example:

```http
GET /bookmarks?search=typescript&tag=development&limit=20
```

---

## Get bookmark

```http
GET /bookmarks/:id
```

Example:

```http
GET /bookmarks/1
```

---

## Create bookmark

```http
POST /bookmarks
Content-Type: application/json
```

Example:

```json
{
  "url": "https://example.com",
  "title": "Example",
  "description": "A useful development resource",
  "tags": "development,web"
}
```

---

## Update bookmark

```http
PUT /bookmarks/:id
Content-Type: application/json
```

Example:

```json
{
  "title": "Updated bookmark",
  "tags": "typescript,bun"
}
```

---

## Delete bookmark

```http
DELETE /bookmarks/:id
```

---

## Delete all bookmarks

```http
DELETE /bookmarks
```

> ⚠️ Destructive operations will receive stronger protection as the project evolves.

---

# 🗃️ Data Model

Current bookmark schema:

| Field         | Type     | Description          |
| ------------- | -------- | -------------------- |
| `id`          | INTEGER  | Primary key          |
| `url`         | TEXT     | Bookmark URL         |
| `title`       | TEXT     | Optional title       |
| `description` | TEXT     | Optional description |
| `tags`        | TEXT     | Optional tags        |
| `created_at`  | DATETIME | Creation timestamp   |
| `updated_at`  | DATETIME | Update timestamp     |

Local SQLite database files are intentionally excluded from version control.

---

# 🔐 Security Principles

Security is being designed into the architecture incrementally.

Current principles include:

* 🔒 Never commit secrets
* 🔑 Use environment variables for credentials
* 🧹 Validate external input
* 🌐 Restrict accepted URL protocols
* 🛡️ Avoid unsafe rendering of untrusted content
* 🚫 Avoid unnecessary server-side URL fetching
* 🕵️ Consider SSRF before introducing URL metadata fetching
* 📦 Limit request sizes
* 🚦 Add rate limiting where appropriate
* 🧱 Protect destructive operations
* 📋 Maintain structured logging
* 🧪 Add automated security-focused tests

---

# 🤖 AI-Assisted Engineering

AI is part of the development workflow, but it is not treated as an unrestricted code generator.

The repository contains:

```text
.specify/
    │
    ├── memory/
    │      └── constitution.md
    │
    ├── templates/
    │
    ├── workflows/
    │
    └── integrations/
```

These project-level artifacts provide constraints and context for AI-assisted development.

The intended workflow is:

```text
Human Intent
     │
     ▼
Specification
     │
     ▼
Architecture
     │
     ▼
AI-Assisted Implementation
     │
     ▼
Human Review
     │
     ▼
Verification
```

---

# 🧩 GitHub Spec Kit

This project uses **GitHub Spec Kit** as part of its specification-driven development workflow.

The official Spec Kit documentation currently describes multiple processes, including Spec-Driven Development, bug fixing, and idea assessment. The core SDD workflow is built around structured artifacts that guide coding agents through implementation.

### Official resources

* 🌐 [Spec Kit Documentation](https://github.github.com/spec-kit/)
* 📚 [Spec-Driven Development Quickstart](https://github.github.com/spec-kit/quickstart.html)
* ⚙️ [Spec Kit Reference](https://github.github.com/spec-kit/reference/overview.html)
* 🧩 [Spec Kit Extensions](https://github.github.com/spec-kit/reference/extensions.html)

---

# 🗺️ Roadmap

## `v0.1.0` — Foundation ✅

**Current release**

* [x] Bun runtime
* [x] TypeScript
* [x] Native SQLite
* [x] Database initialization
* [x] Bookmark CRUD
* [x] Search
* [x] Tag filtering
* [x] Pagination foundation
* [x] REST API
* [x] Health endpoint
* [x] Layered architecture
* [x] Spec Kit integration
* [x] Project constitution
* [x] GitHub repository

---

## `v0.2.0` — Web Workspace 🚧

Planned:

* [ ] Premium responsive dashboard
* [ ] Bookmark cards
* [ ] Search interface
* [ ] Tag filters
* [ ] Add bookmark UI
* [ ] Edit bookmark UI
* [ ] Delete confirmation
* [ ] Loading states
* [ ] Empty states
* [ ] Error states
* [ ] Accessibility improvements
* [ ] Mobile-first experience

---

## `v0.3.0` — Telegram Vault Bot 🤖

Planned:

* [ ] Telegram Bot API
* [ ] Long polling
* [ ] `/start`
* [ ] `/help`
* [ ] `/add <url>`
* [ ] Plain URL capture
* [ ] User allowlist
* [ ] Duplicate detection
* [ ] Idempotent update processing
* [ ] Structured Telegram errors

---

## `v0.4.0` — Reliability & Security 🛡️

Planned:

* [ ] Automated tests
* [ ] Service tests
* [ ] API tests
* [ ] Validation tests
* [ ] Security hardening
* [ ] Request limits
* [ ] Rate limiting
* [ ] Security headers
* [ ] Structured logging
* [ ] Destructive-operation protection

---

## `v1.0.0` — Production Foundation 🚀

Long-term goals:

* [ ] Stable API contract
* [ ] Complete web workspace
* [ ] Telegram integration
* [ ] Comprehensive automated tests
* [ ] Authentication
* [ ] Authorization
* [ ] Production configuration
* [ ] Deployment documentation
* [ ] Observability
* [ ] Security review

> 🧭 The roadmap is intentionally flexible and will evolve with the project.

---

# 🧪 Development Commands

Start development:

```bash
bun run dev
```

Initialize database:

```bash
bun run src/db/init.ts
```

Seed development data:

```bash
bun run src/scripts/seed.ts
```

Type-check:

```bash
bunx tsc --noEmit
```

---

# 📊 Project Status

<p align="center">

| Area              | Status                 |
| ----------------- | ---------------------- |
| 🗄️ Database      | 🟢 Foundation Complete |
| 🌐 REST API       | 🟢 Foundation Complete |
| 🔖 Bookmark CRUD  | 🟢 Implemented         |
| 🔎 Search         | 🟢 Implemented         |
| 🏷️ Tag Filtering | 🟢 Implemented         |
| 🖥️ Web UI        | 🟡                     |
