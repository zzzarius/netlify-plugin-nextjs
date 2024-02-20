
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  copyPrerenderedContent
} from "./esm-chunks/chunk-67EWAGDQ.js";
import {
  copyStaticAssets,
  copyStaticContent,
  publishStaticDir,
  unpublishStaticDir
} from "./esm-chunks/chunk-ZWFKLYLH.js";
import {
  createEdgeHandlers
} from "./esm-chunks/chunk-YIE34LVX.js";
import {
  createServerHandler
} from "./esm-chunks/chunk-T6AZTXZF.js";
import "./esm-chunks/chunk-4J4A5OE2.js";
import "./esm-chunks/chunk-VZNKO4OO.js";
import {
  restoreBuildCache,
  saveBuildCache
} from "./esm-chunks/chunk-72ZI2IVI.js";
import {
  setImageConfig
} from "./esm-chunks/chunk-TOK7TKP3.js";
import {
  PluginContext
} from "./esm-chunks/chunk-DWC6JSN7.js";
import "./esm-chunks/chunk-UYKENJEU.js";
import "./esm-chunks/chunk-TYCYFZ22.js";
import "./esm-chunks/chunk-5JVNISGM.js";

// src/index.ts
import { existsSync } from "node:fs";
var onPreBuild = async (options) => {
  process.env.NEXT_PRIVATE_STANDALONE = "true";
  if (!options.constants.IS_LOCAL) {
    await restoreBuildCache(new PluginContext(options));
  }
};
var onBuild = async (options) => {
  const ctx = new PluginContext(options);
  if (!existsSync(ctx.publishDir)) {
    ctx.failBuild(
      `Publish directory not found under: ${ctx.publishDir}, please check your netlify.toml`
    );
  }
  await setImageConfig(ctx);
  if (!options.constants.IS_LOCAL) {
    await saveBuildCache(ctx);
  }
  await Promise.all([
    copyStaticAssets(ctx),
    copyStaticContent(ctx),
    copyPrerenderedContent(ctx),
    createServerHandler(ctx),
    createEdgeHandlers(ctx)
  ]);
};
var onPostBuild = async (options) => {
  await publishStaticDir(new PluginContext(options));
};
var onEnd = async (options) => {
  await unpublishStaticDir(new PluginContext(options));
};
export {
  onBuild,
  onEnd,
  onPostBuild,
  onPreBuild
};
