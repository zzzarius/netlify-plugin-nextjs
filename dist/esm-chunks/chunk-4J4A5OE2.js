
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  require_out
} from "./chunk-VZNKO4OO.js";
import {
  RUN_CONFIG
} from "./chunk-UYKENJEU.js";
import {
  __toESM
} from "./chunk-5JVNISGM.js";

// src/build/content/server.ts
var import_fast_glob = __toESM(require_out(), 1);
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, readdir, readlink, symlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
var copyNextServerCode = async (ctx) => {
  const reqServerFilesPath = join(
    ctx.standaloneRootDir,
    ctx.relPublishDir,
    "required-server-files.json"
  );
  const reqServerFiles = JSON.parse(await readFile(reqServerFilesPath, "utf-8"));
  if (ctx.distDir.replace(new RegExp(`^${ctx.packagePath}/?`), "") !== reqServerFiles.config.distDir) {
    reqServerFiles.config.distDir = ctx.nextDistDir;
    await writeFile(reqServerFilesPath, JSON.stringify(reqServerFiles));
  }
  await mkdir(ctx.serverHandlerDir, { recursive: true });
  await writeFile(
    join(ctx.serverHandlerDir, RUN_CONFIG),
    JSON.stringify(reqServerFiles.config),
    "utf-8"
  );
  const srcDir = join(ctx.standaloneDir, ctx.nextDistDir);
  const nextFolder = ctx.distDir === ctx.buildConfig.distDir ? ctx.distDir : ctx.nextDistDir;
  const destDir = join(ctx.serverHandlerDir, nextFolder);
  const paths = await (0, import_fast_glob.default)(
    [`*`, `server/*`, `server/chunks/*`, `server/edge-chunks/*`, `server/+(app|pages)/**/*.js`],
    {
      cwd: srcDir,
      extglob: true
    }
  );
  await Promise.all(
    paths.map(async (path) => {
      const srcPath = join(srcDir, path);
      const destPath = join(destDir, path);
      if (path === "server/middleware-manifest.json") {
        try {
          await replaceMiddlewareManifest(srcPath, destPath);
        } catch (error) {
          throw new Error("Could not patch middleware manifest file", { cause: error });
        }
        return;
      }
      await cp(srcPath, destPath, { recursive: true, force: true });
    })
  );
};
async function recreateNodeModuleSymlinks(src, dest, org) {
  const dirents = await readdir(join(src, org || ""), { withFileTypes: true });
  await Promise.all(
    dirents.map(async (dirent) => {
      if (dirent.name.startsWith("@")) {
        return recreateNodeModuleSymlinks(src, dest, dirent.name);
      }
      if (dirent.isSymbolicLink()) {
        const symlinkSrc = join(dest, org || "", dirent.name);
        const symlinkTarget = await readlink(join(src, org || "", dirent.name));
        const symlinkDest = join(dest, org || "", symlinkTarget);
        if (existsSync(symlinkDest) && !existsSync(symlinkSrc)) {
          if (org) {
            await mkdir(join(dest, org), { recursive: true });
          }
          await symlink(symlinkTarget, symlinkSrc);
        }
      }
    })
  );
}
var copyNextDependencies = async (ctx) => {
  const entries = await readdir(ctx.standaloneDir);
  const promises = entries.map(async (entry) => {
    if (entry === "package.json" || entry === ctx.nextDistDir) {
      return;
    }
    const src = join(ctx.standaloneDir, entry);
    const dest = join(ctx.serverHandlerDir, entry);
    await cp(src, dest, { recursive: true, verbatimSymlinks: true, force: true });
    if (entry === "node_modules") {
      await recreateNodeModuleSymlinks(ctx.resolve("node_modules"), dest);
    }
  });
  const rootSrcDir = join(ctx.standaloneRootDir, "node_modules");
  const rootDestDir = join(ctx.serverHandlerRootDir, "node_modules");
  if (existsSync(rootSrcDir) && ctx.standaloneRootDir !== ctx.standaloneDir) {
    promises.push(
      cp(rootSrcDir, rootDestDir, { recursive: true, verbatimSymlinks: true }).then(
        () => recreateNodeModuleSymlinks(resolve("node_modules"), rootDestDir)
      )
    );
  }
  await Promise.all(promises);
  const require2 = createRequire(ctx.serverHandlerDir);
  try {
    require2.resolve("styled-jsx");
    require2.resolve("next");
  } catch {
    throw new Error(
      "node_modules are not installed correctly, if you are using pnpm please set the public hoist pattern to: `public-hoist-pattern[]=*`.\nRefer to your docs for more details: https://docs.netlify.com/integrations/frameworks/next-js/overview/#pnpm-support"
    );
  }
};
var writeTagsManifest = async (ctx) => {
  const manifest = await ctx.getPrerenderManifest();
  const routes = Object.entries(manifest.routes).map(async ([route, definition]) => {
    let tags;
    if (definition.dataRoute?.endsWith(".rsc")) {
      const path = join(ctx.publishDir, `server/app/${route === "/" ? "/index" : route}.meta`);
      try {
        const file = await readFile(path, "utf-8");
        const meta = JSON.parse(file);
        tags = meta.headers["x-next-cache-tags"];
      } catch {
        if (!definition.dataRoute?.endsWith("/default.rsc")) {
          console.log(`Unable to read cache tags for: ${path}`);
        }
      }
    }
    if (definition.dataRoute?.endsWith(".json")) {
      tags = `_N_T_${route}`;
    }
    if (definition.dataRoute === null) {
      tags = definition.initialHeaders?.["x-next-cache-tags"];
    }
    return [route, tags];
  });
  await writeFile(
    join(ctx.serverHandlerDir, ".netlify/tags-manifest.json"),
    JSON.stringify(Object.fromEntries(await Promise.all(routes))),
    "utf-8"
  );
};
var replaceMiddlewareManifest = async (sourcePath, destPath) => {
  await mkdir(dirname(destPath), { recursive: true });
  const data = await readFile(sourcePath, "utf8");
  const manifest = JSON.parse(data);
  const newManifest = {
    ...manifest,
    middleware: {}
  };
  const newData = JSON.stringify(newManifest);
  await writeFile(destPath, newData);
};

export {
  copyNextServerCode,
  copyNextDependencies,
  writeTagsManifest
};
