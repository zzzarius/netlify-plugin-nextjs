
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  require_out
} from "./chunk-VZNKO4OO.js";
import {
  EDGE_HANDLER_NAME
} from "./chunk-DWC6JSN7.js";
import {
  __toESM
} from "./chunk-5JVNISGM.js";

// src/build/functions/edge.ts
var import_fast_glob = __toESM(require_out(), 1);
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
var writeEdgeManifest = async (ctx, manifest) => {
  await mkdir(ctx.edgeFunctionsDir, { recursive: true });
  await writeFile(join(ctx.edgeFunctionsDir, "manifest.json"), JSON.stringify(manifest, null, 2));
};
var copyRuntime = async (ctx, handlerDirectory) => {
  const files = await (0, import_fast_glob.glob)("edge-runtime/**/*", {
    cwd: ctx.pluginDir,
    ignore: ["**/*.test.ts"],
    dot: true
  });
  await Promise.all(
    files.map(
      (path) => cp(join(ctx.pluginDir, path), join(handlerDirectory, path), { recursive: true })
    )
  );
};
var writeHandlerFile = async (ctx, { matchers, name }) => {
  const nextConfig = ctx.buildConfig;
  const handlerName = getHandlerName({ name });
  const handlerDirectory = join(ctx.edgeFunctionsDir, handlerName);
  const handlerRuntimeDirectory = join(handlerDirectory, "edge-runtime");
  await copyRuntime(ctx, handlerDirectory);
  await writeFile(join(handlerRuntimeDirectory, "matchers.json"), JSON.stringify(matchers));
  const minimalNextConfig = {
    basePath: nextConfig.basePath,
    i18n: nextConfig.i18n,
    trailingSlash: nextConfig.trailingSlash
  };
  await writeFile(
    join(handlerRuntimeDirectory, "next.config.json"),
    JSON.stringify(minimalNextConfig)
  );
  await writeFile(
    join(handlerDirectory, `${handlerName}.js`),
    `
    import {handleMiddleware} from './edge-runtime/middleware.ts';
    import handler from './server/${name}.js';
    export default (req, context) => handleMiddleware(req, context, handler);
    `
  );
};
var copyHandlerDependencies = async (ctx, { name, files, wasm }) => {
  const srcDir = join(ctx.standaloneDir, ctx.nextDistDir);
  const destDir = join(ctx.edgeFunctionsDir, getHandlerName({ name }));
  await Promise.all(
    files.map(async (file) => {
      if (file === `server/${name}.js`) {
        const edgeRuntimeDir = join(ctx.pluginDir, "edge-runtime");
        const shimPath = join(edgeRuntimeDir, "shim/index.js");
        const shim = await readFile(shimPath, "utf8");
        const importsDir = relative(dirname(join(srcDir, file)), join(srcDir, "server"));
        const importsSrc = `${importsDir || "."}/edge-runtime-webpack.js`;
        const imports = `import '${importsSrc}';`;
        const exports = `export default _ENTRIES["middleware_${name}"].default;`;
        const parts = [shim, imports];
        if (wasm?.length) {
          parts.push(
            `import { decode as _base64Decode } from "../edge-runtime/vendor/deno.land/std@0.175.0/encoding/base64.ts";`
          );
          for (const wasmChunk of wasm ?? []) {
            const data = await readFile(join(srcDir, wasmChunk.filePath));
            parts.push(
              `const ${wasmChunk.name} = _base64Decode(${JSON.stringify(
                data.toString("base64")
              )}).buffer`
            );
          }
        }
        const entrypoint = await readFile(join(srcDir, file), "utf8");
        await mkdir(dirname(join(destDir, file)), { recursive: true });
        await writeFile(join(destDir, file), [...parts, entrypoint, exports].join("\n;"));
      } else {
        await cp(join(srcDir, file), join(destDir, file));
      }
    })
  );
};
var createEdgeHandler = async (ctx, definition) => {
  await copyHandlerDependencies(ctx, definition);
  await writeHandlerFile(ctx, definition);
};
var getHandlerName = ({ name }) => `${EDGE_HANDLER_NAME}-${name.replace(/\W/g, "-")}`;
var buildHandlerDefinition = (ctx, { name, matchers, page }) => {
  const fun = getHandlerName({ name });
  const funName = name.endsWith("middleware") ? "Next.js Middleware Handler" : `Next.js Edge Handler: ${page}`;
  const cache = name.endsWith("middleware") ? void 0 : "manual";
  const generator = `${ctx.pluginName}@${ctx.pluginVersion}`;
  return matchers.map((matcher) => ({
    function: fun,
    name: funName,
    pattern: matcher.regexp,
    cache,
    generator
  }));
};
var createEdgeHandlers = async (ctx) => {
  await rm(ctx.edgeFunctionsDir, { recursive: true, force: true });
  const nextManifest = await ctx.getMiddlewareManifest();
  const nextDefinitions = [
    ...Object.values(nextManifest.middleware)
    // ...Object.values(nextManifest.functions)
  ];
  await Promise.all(nextDefinitions.map((def) => createEdgeHandler(ctx, def)));
  const netlifyDefinitions = nextDefinitions.flatMap((def) => buildHandlerDefinition(ctx, def));
  const netlifyManifest = {
    version: 1,
    functions: netlifyDefinitions
  };
  await writeEdgeManifest(ctx, netlifyManifest);
};

export {
  createEdgeHandlers
};
