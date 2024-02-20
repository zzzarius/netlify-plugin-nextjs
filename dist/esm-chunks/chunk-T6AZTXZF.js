
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  copyNextDependencies,
  copyNextServerCode,
  writeTagsManifest
} from "./chunk-4J4A5OE2.js";
import {
  require_out
} from "./chunk-VZNKO4OO.js";
import {
  SERVER_HANDLER_NAME
} from "./chunk-DWC6JSN7.js";
import {
  __toESM
} from "./chunk-5JVNISGM.js";

// src/build/functions/server.ts
var import_fast_glob = __toESM(require_out(), 1);
import { cp, mkdir, readFile, rm, writeFile } from "fs/promises";
import { join } from "node:path";
var copyHandlerDependencies = async (ctx) => {
  const fileList = await (0, import_fast_glob.glob)("dist/**/*", { cwd: ctx.pluginDir });
  await Promise.all(
    [...fileList].map(
      (path) => cp(join(ctx.pluginDir, path), join(ctx.serverHandlerDir, ".netlify", path), {
        recursive: true,
        force: true
      })
    )
  );
};
var writeHandlerManifest = async (ctx) => {
  await writeFile(
    join(ctx.serverHandlerRootDir, `${SERVER_HANDLER_NAME}.json`),
    JSON.stringify({
      config: {
        name: "Next.js Server Handler",
        generator: `${ctx.pluginName}@${ctx.pluginVersion}`,
        nodeBundler: "none",
        // the folders can vary in monorepos based on the folder structure of the user so we have to glob all
        includedFiles: ["**"],
        includedFilesBasePath: ctx.serverHandlerRootDir
      },
      version: 1
    }),
    "utf-8"
  );
};
var writePackageMetadata = async (ctx) => {
  await writeFile(
    join(ctx.serverHandlerRootDir, "package.json"),
    JSON.stringify({ type: "module" })
  );
};
var getHandlerFile = async (ctx) => {
  const templatesDir = join(ctx.pluginDir, "dist/build/templates");
  if (ctx.packagePath.length !== 0) {
    const template = await readFile(join(templatesDir, "handler-monorepo.tmpl.js"), "utf-8");
    return template.replaceAll("{{cwd}}", ctx.lambdaWorkingDirectory).replace("{{nextServerHandler}}", ctx.nextServerHandler);
  }
  return await readFile(join(templatesDir, "handler.tmpl.js"), "utf-8");
};
var writeHandlerFile = async (ctx) => {
  const handler = await getHandlerFile(ctx);
  await writeFile(join(ctx.serverHandlerRootDir, `${SERVER_HANDLER_NAME}.mjs`), handler);
};
var createServerHandler = async (ctx) => {
  await rm(ctx.serverFunctionsDir, { recursive: true, force: true });
  await mkdir(join(ctx.serverHandlerDir, ".netlify"), { recursive: true });
  await Promise.all([
    copyNextServerCode(ctx),
    copyNextDependencies(ctx),
    writeTagsManifest(ctx),
    copyHandlerDependencies(ctx),
    writeHandlerManifest(ctx),
    writePackageMetadata(ctx),
    writeHandlerFile(ctx)
  ]);
};

export {
  createServerHandler
};
