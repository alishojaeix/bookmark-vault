import { Database } from "bun:sqlite";

export class DB {
  private static instance: Database | null = null;

  static getInstance(): Database {
    if (!DB.instance) {
      DB.instance = new Database("bookmarks.sqlite");
      DB.instance.exec("PRAGMA journal_mode = WAL;");
    }

    return DB.instance;
  }
}