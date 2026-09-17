# Bookmark App

A bookmark management application built with BunJS, TypeScript, and SQLite.

## Features

- Create, read, update, and delete bookmarks
- Search bookmarks by keyword (title, description, or tags)
- Filter bookmarks by tag
- Pagination support
- SQLite database

## Tech Stack

- **Runtime**: BunJS
- **Language**: TypeScript
- **Database**: SQLite (via `bun-drivers`)
- **Server**: Built-in Bun HTTP server (no framework)

## Getting Started

### Installation

```bash
bun install
```

### Setup Database

Generate database and initial table:

```bash
bun run db:migrate
```

Or reset database:

```bash
bun run db:reset
```

### Run Server

Start the development server with hot reload:

```bash
bun run dev
```

The server will start on `http://localhost:3000`.

### Seed Database (Optional)

Add some sample bookmarks:

```bash
bun run db:seed
```

## API Endpoints

### Bookmarks

- `GET /bookmarks` - List all bookmarks with optional filtering
  - Query params: `tag`, `search`, `limit`, `offset`
  
- `POST /bookmarks` - Create a new bookmark
  - Body: `{ url, title?, description?, tags? }`

- `GET /bookmarks/:id` - Get a specific bookmark

- `PUT /bookmarks/:id` - Update a bookmark
  - Body: `{ title?, description?, tags? }`

- `DELETE /bookmarks/:id` - Delete a bookmark

- `DELETE /bookmarks` - Clear all bookmarks
  - Headers: `X-Admin-Password: password123`

## Example Usage

### Create a bookmark

```bash
curl -X POST http://localhost:3000/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "title": "Example Site",
    "description": "An example website",
    "tags": "example, test"
  }'
```

### List bookmarks with search

```bash
curl "http://localhost:3000/bookmarks?search=example&limit=10"
```

### List bookmarks by tag

```bash
curl "http://localhost:3000/bookmarks?tag=test"
```

## Data Model

```
bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  tags TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Project Structure

```
.
├── src/
│   ├── controllers/
│   │   └── bookmark.controller.ts
│   ├── db/
│   │   └── db.ts
│   ├── services/
│   │   └── bookmark.service.ts
│   ├── types/
│   │   └── index.ts
│   ├── scripts/
│   │   └── seed.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```