import { BookmarkController } from "./controllers/bookmark.controller.js";
import { migrate } from "./db/init.js";

const controller = new BookmarkController();

// Run database migration
migrate();

const server = Bun.serve({
  port: 3000,

  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    console.log(`${method} ${path}`);

    // Health check
    if (path === "/health" && method === "GET") {
      return new globalThis.Response(
        JSON.stringify({
          success: true,
          message: "Bookmark API is running",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Root route
    if (path === "/" && method === "GET") {
      return new globalThis.Response(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Bookmark App</title>
          </head>

          <body>
            <h1>Bookmark App API</h1>

            <p>See README.md for API documentation</p>

            <ul>
              <li>GET /bookmarks - List all bookmarks</li>
              <li>POST /bookmarks - Create a bookmark</li>
              <li>GET /bookmarks/:id - Get a bookmark</li>
              <li>PUT /bookmarks/:id - Update a bookmark</li>
              <li>DELETE /bookmarks/:id - Delete a bookmark</li>
            </ul>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    // GET /bookmarks
    if (path === "/bookmarks" && method === "GET") {
      return controller.index(request, {
        json(data: unknown) {
          return new globalThis.Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        status(code: number) {
          return {
            json(data: unknown) {
              return new globalThis.Response(JSON.stringify(data), {
                status: code,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            },
          };
        },
      });
    }

    // POST /bookmarks
    if (path === "/bookmarks" && method === "POST") {
      return controller.create(request, {
        json(data: unknown) {
          return new globalThis.Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        status(code: number) {
          return {
            json(data: unknown) {
              return new globalThis.Response(JSON.stringify(data), {
                status: code,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            },
          };
        },
      });
    }

    // GET /bookmarks/:id
    const showMatch = path.match(/^\/bookmarks\/(\d+)$/);

    if (showMatch && method === "GET") {
      const id = Number(showMatch[1]);

      const requestWithParams = Object.assign(request, {
        params: { id: String(id) },
      });

      return controller.show(requestWithParams, {
        json(data: unknown) {
          return new globalThis.Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        status(code: number) {
          return {
            json(data: unknown) {
              return new globalThis.Response(JSON.stringify(data), {
                status: code,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            },
          };
        },
      });
    }

    // PUT /bookmarks/:id
    if (showMatch && method === "PUT") {
      const id = Number(showMatch[1]);

      const requestWithParams = Object.assign(request, {
        params: { id: String(id) },
      });

      return controller.update(requestWithParams, {
        json(data: unknown) {
          return new globalThis.Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        status(code: number) {
          return {
            json(data: unknown) {
              return new globalThis.Response(JSON.stringify(data), {
                status: code,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            },
          };
        },
      });
    }

    // DELETE /bookmarks/:id
    if (showMatch && method === "DELETE") {
      const id = Number(showMatch[1]);

      const requestWithParams = Object.assign(request, {
        params: { id: String(id) },
      });

      return controller.delete(requestWithParams, {
        json(data: unknown) {
          return new globalThis.Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        status(code: number) {
          return {
            json(data: unknown) {
              return new globalThis.Response(JSON.stringify(data), {
                status: code,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            },
          };
        },
      });
    }

    // DELETE /bookmarks
    if (path === "/bookmarks" && method === "DELETE") {
      return controller.clearAll(request, {
        json(data: unknown) {
          return new globalThis.Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        },

        status(code: number) {
          return {
            json(data: unknown) {
              return new globalThis.Response(JSON.stringify(data), {
                status: code,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            },
          };
        },
      });
    }

    // 404
    return new globalThis.Response(
      JSON.stringify({
        success: false,
        error: "Route not found",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
});

console.log(`🚀 Bookmark API running at http://localhost:${server.port}`);