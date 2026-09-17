import type { CreateBookmarkDto, UpdateBookmarkDto, QueryBookmarkDto } from "../types/index.js";
import { BookmarkService } from "../services/bookmark.service.js";

export class BookmarkController {
  private service = new BookmarkService();

  index(request: Request, response: any) {
    const url = new URL(request.url);

    const query: QueryBookmarkDto = {
      tag: url.searchParams.get("tag") || undefined,
      search: url.searchParams.get("search") || undefined,
      limit: url.searchParams.get("limit")
        ? Number(url.searchParams.get("limit"))
        : undefined,
      offset: url.searchParams.get("offset")
        ? Number(url.searchParams.get("offset"))
        : undefined,
    };

    try {
      const bookmarks = this.service.findAll(query);

      return response.json({
        success: true,
        bookmarks,
      });
    } catch (error) {
      console.error(error);

      return response.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }

  async create(request: Request, response: any) {
    try {
      const body: CreateBookmarkDto = await request.json();

      const bookmark = this.service.create(body);

      return response.status(201).json({
        success: true,
        bookmark,
      });
    } catch (error) {
      console.error(error);

      return response.status(400).json({
        success: false,
        error: "Invalid request body",
      });
    }
  }

  show(request: Request, response: any) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return response.status(400).json({
        success: false,
        error: "Invalid bookmark ID",
      });
    }

    const bookmark = this.service.findById(id);

    if (!bookmark) {
      return response.status(404).json({
        success: false,
        error: "Bookmark not found",
      });
    }

    return response.json({
      success: true,
      bookmark,
    });
  }

  async update(request: Request, response: any) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return response.status(400).json({
        success: false,
        error: "Invalid bookmark ID",
      });
    }

    try {
      const body: UpdateBookmarkDto = await request.json();

      const bookmark = this.service.update(id, body);

      if (!bookmark) {
        return response.status(404).json({
          success: false,
          error: "Bookmark not found",
        });
      }

      return response.json({
        success: true,
        bookmark,
      });
    } catch (error) {
      console.error(error);

      return response.status(400).json({
        success: false,
        error: "Invalid request body",
      });
    }
  }

  delete(request: Request, response: any) {
    const id = Number(request.params.id);

    if (Number.isNaN(id)) {
      return response.status(400).json({
        success: false,
        error: "Invalid bookmark ID",
      });
    }

    const deleted = this.service.delete(id);

    if (!deleted) {
      return response.status(404).json({
        success: false,
        error: "Bookmark not found",
      });
    }

    return response.json({
      success: true,
      message: "Bookmark deleted",
    });
  }

  clearAll(request: Request, response: any) {
    const password = request.headers.get("X-Admin-Password");

    if (password !== "password123") {
      return response.status(403).json({
        success: false,
        error: "Unauthorized",
      });
    }

    try {
      this.service.deleteAll();

      return response.json({
        success: true,
        message: "All bookmarks cleared",
      });
    } catch (error) {
      console.error(error);

      return response.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
}