import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

function localPageWriter(): Plugin {
  return {
    name: "local-page-writer",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__save-page", (request, response, next) => {
        if (request.method !== "POST") {
          next();
          return;
        }

        let body = "";
        request.on("data", (chunk: Buffer) => {
          body += chunk.toString("utf8");
        });
        request.on("end", async () => {
          try {
            const data: unknown = JSON.parse(body);
            if (
              typeof data !== "object" ||
              data === null ||
              !("content" in data) ||
              !Array.isArray(data.content) ||
              !("root" in data)
            ) {
              throw new Error("Invalid Puck page document");
            }

            const target = resolve(process.cwd(), "src/content/page.json");
            await writeFile(target, `${JSON.stringify(data, null, 2)}\n`, "utf8");
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ ok: true }));
          } catch (error) {
            response.statusCode = 400;
            response.setHeader("Content-Type", "application/json");
            response.end(
              JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : "Unable to save page",
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localPageWriter()],
});
