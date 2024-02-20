
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

// src/build/content/static.ts
var import_fast_glob = __toESM(require_out(), 1);
import { existsSync } from "node:fs";
import { cp, mkdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";
var copyStaticContent = async (ctx) => {
  const srcDir = join(ctx.publishDir, "server/pages");
  const destDir = ctx.blobDir;
  const paths = await (0, import_fast_glob.default)("**/*.+(html|json)", {
    cwd: srcDir,
    extglob: true
  });
  try {
    await Promise.all(
      paths.filter((path) => !paths.includes(`${path.slice(0, -5)}.json`)).map(async (path) => {
        await cp(join(srcDir, path), join(destDir, await encodeBlobKey(path)), {
          recursive: true,
          force: true
        });
      })
    );
  } catch (error) {
    ctx.failBuild("Failed assembling static pages for upload", error);
  }
};
var copyStaticAssets = async (ctx) => {
  try {
    await rm(ctx.staticDir, { recursive: true, force: true });
    const { basePath } = await ctx.getRoutesManifest();
    if (existsSync(ctx.resolve("public"))) {
      await cp(ctx.resolve("public"), join(ctx.staticDir, basePath), { recursive: true });
    }
    if (existsSync(join(ctx.publishDir, "static"))) {
      await cp(join(ctx.publishDir, "static"), join(ctx.staticDir, basePath, "_next/static"), {
        recursive: true
      });
    }
  } catch (error) {
    ctx.failBuild("Failed copying static assets", error);
  }
};
var publishStaticDir = async (ctx) => {
  try {
    await mkdir(ctx.resolve(".netlify/.next"), { recursive: true });
    await rename(ctx.publishDir, ctx.resolve(".netlify/.next"));
    await rename(ctx.staticDir, ctx.publishDir);
  } catch (error) {
    ctx.failBuild("Failed publishing static content", error instanceof Error ? { error } : {});
  }
};
var unpublishStaticDir = async (ctx) => {
  try {
    if (existsSync(ctx.resolve(".netlify/.next"))) {
      await rename(ctx.publishDir, ctx.staticDir);
      await rename(ctx.resolve(".netlify/.next"), ctx.publishDir);
    }
  } catch {
  }
};

export {
  copyStaticContent,
  copyStaticAssets,
  publishStaticDir,
  unpublishStaticDir
};
