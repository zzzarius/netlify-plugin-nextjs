
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();


// src/build/cache.ts
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join } from "node:path";
var saveBuildCache = async (ctx) => {
  const { cache } = ctx.utils;
  const cacheDir = join(ctx.publishDir, "cache");
  if (existsSync(cacheDir)) {
    await rm(join(cacheDir, "fetch-cache"), { recursive: true, force: true });
    await cache.save(cacheDir);
    console.log("zzzzzz Next.js cache saved");
  } else {
    console.log("zzzzzz No Next.js cache to save");
  }
};
var restoreBuildCache = async (ctx) => {
  const { cache } = ctx.utils;
  const cacheDir = join(ctx.publishDir, "cache");
  if (await cache.restore(cacheDir)) {
    console.log("zzzzzz Next.js cache restored");
  } else {
    console.log("zzzzzz No Next.js cache to restore");
  }
};

export {
  saveBuildCache,
  restoreBuildCache
};
