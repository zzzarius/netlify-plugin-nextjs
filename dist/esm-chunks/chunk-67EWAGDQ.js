
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  require_out
} from "./chunk-VZNKO4OO.js";
import {
  encodeBlobKey
} from "./chunk-TYCYFZ22.js";
import {
  __toESM
} from "./chunk-5JVNISGM.js";

// src/build/content/prerendered.ts
var import_fast_glob = __toESM(require_out(), 1);
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
var writeCacheEntry = async (route, value, lastModified, ctx) => {
  const path = join(ctx.blobDir, await encodeBlobKey(route));
  const entry = JSON.stringify({
    lastModified,
    value
  });
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, entry, "utf-8");
};
var routeToFilePath = (path) => path === "/" ? "/index" : path;
var buildPagesCacheValue = async (path) => ({
  kind: "PAGE",
  html: await readFile(`${path}.html`, "utf-8"),
  pageData: JSON.parse(await readFile(`${path}.json`, "utf-8")),
  postponed: void 0,
  headers: void 0,
  status: void 0
});
var buildAppCacheValue = async (path) => ({
  kind: "PAGE",
  html: await readFile(`${path}.html`, "utf-8"),
  pageData: await readFile(`${path}.rsc`, "utf-8"),
  ...JSON.parse(await readFile(`${path}.meta`, "utf-8"))
});
var buildRouteCacheValue = async (path) => ({
  kind: "ROUTE",
  body: await readFile(`${path}.body`, "base64"),
  ...JSON.parse(await readFile(`${path}.meta`, "utf-8"))
});
var buildFetchCacheValue = async (path) => ({
  kind: "FETCH",
  ...JSON.parse(await readFile(path, "utf-8"))
});
var copyPrerenderedContent = async (ctx) => {
  try {
    const manifest = await ctx.getPrerenderManifest();
    await Promise.all(
      Object.entries(manifest.routes).map(async ([route, meta]) => {
        const lastModified = meta.initialRevalidateSeconds ? Date.now() - 31536e6 : Date.now();
        const key = routeToFilePath(route);
        let value;
        switch (true) {
          case (meta.dataRoute?.endsWith("/default.rsc") && !existsSync(join(ctx.publishDir, "server/app", `${key}.html`))):
            return;
          case meta.dataRoute?.endsWith(".json"):
            value = await buildPagesCacheValue(join(ctx.publishDir, "server/pages", key));
            break;
          case meta.dataRoute?.endsWith(".rsc"):
            value = await buildAppCacheValue(join(ctx.publishDir, "server/app", key));
            break;
          case meta.dataRoute === null:
            value = await buildRouteCacheValue(join(ctx.publishDir, "server/app", key));
            break;
          default:
            throw new Error(`Unrecognized content: ${route}`);
        }
        await writeCacheEntry(key, value, lastModified, ctx);
      })
    );
    if (existsSync(join(ctx.publishDir, `server/app/_not-found.html`))) {
      const lastModified = Date.now();
      const key = "/404";
      const value = await buildAppCacheValue(join(ctx.publishDir, "server/app/_not-found"));
      await writeCacheEntry(key, value, lastModified, ctx);
    }
  } catch (error) {
    ctx.failBuild("Failed assembling prerendered content for upload", error);
  }
};
var copyFetchContent = async (ctx) => {
  try {
    const paths = await (0, import_fast_glob.glob)(["!(*.*)"], {
      cwd: join(ctx.publishDir, "cache/fetch-cache"),
      extglob: true
    });
    await Promise.all(
      paths.map(async (key) => {
        const lastModified = Date.now() - 31536e6;
        const path = join(ctx.publishDir, "cache/fetch-cache", key);
        const value = await buildFetchCacheValue(path);
        await writeCacheEntry(key, value, lastModified, ctx);
      })
    );
  } catch (error) {
    ctx.failBuild("Failed assembling fetch content for upload", error);
  }
};

export {
  copyPrerenderedContent,
  copyFetchContent
};
