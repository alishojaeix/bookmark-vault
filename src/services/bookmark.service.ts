import { DB } from "../db/db.js";
import type {
  Bookmark,
  CreateBookmarkDto,
  UpdateBookmarkDto,
  QueryBookmarkDto,
} from "../types/index.js";

export class BookmarkService {
  private db = DB.getInstance();

  create(dto: CreateBookmarkDto): Bookmark {
    const stmt = this.db.prepare(`
      INSERT INTO bookmarks (url, title, description, tags)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
      dto.url,
      dto.title ?? null,
      dto.description ?? null,
      dto.tags ?? null
    );

    const bookmark = this.db
      .prepare("SELECT * FROM bookmarks WHERE id = ?")
      .get(result.lastInsertRowid) as Bookmark | null;

    if (!bookmark) {
      throw new Error("Failed to create bookmark");
    }

    return bookmark;
  }

  findById(id: number): Bookmark | null {
    const row = this.db
      .prepare("SELECT * FROM bookmarks WHERE id = ?")
      .get(id) as Bookmark | null;

    return row ?? null;
  }

  findAll(query?: QueryBookmarkDto): Bookmark[] {
    let sql = "SELECT * FROM bookmarks";
    const params: (string | number)[] = [];
    const conditions: string[] = [];

    if (query?.tag) {
      conditions.push("tags LIKE ?");
      params.push(`%${query.tag}%`);
    }

    if (query?.search) {
      conditions.push(
        "(title LIKE ? OR description LIKE ? OR tags LIKE ? OR url LIKE ?)"
      );

      const searchTerm = `%${query.search}%`;

      params.push(
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm
      );
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += " ORDER BY created_at DESC";

    if (query?.limit !== undefined) {
      sql += " LIMIT ?";
      params.push(query.limit);
    }

    if (query?.offset !== undefined) {
      sql += " OFFSET ?";
      params.push(query.offset);
    }

    const rows = this.db
      .prepare(sql)
      .all(...params) as Bookmark[];

    return rows;
  }

  update(id: number, dto: UpdateBookmarkDto): Bookmark | null {
    const existing = this.findById(id);

    if (!existing) {
      return null;
    }

    const title = dto.title ?? existing.title;
    const description = dto.description ?? existing.description;
    const tags = dto.tags ?? existing.tags;
    const url = dto.url ?? existing.url;

    this.db
      .prepare(`
        UPDATE bookmarks
        SET
          url = ?,
          title = ?,
          description = ?,
          tags = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      .run(
        url,
        title ?? null,
        description ?? null,
        tags ?? null,
        id
      );

    return this.findById(id);
  }

  delete(id: number): boolean {
    const result = this.db
      .prepare("DELETE FROM bookmarks WHERE id = ?")
      .run(id);

    return result.changes > 0;
  }

  deleteAll(): void {
    this.db
      .prepare("DELETE FROM bookmarks")
      .run();
  }
}