
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    

// src/build/plugin-context.ts
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
var MODULE_DIR = fileURLToPath(new URL(".", import.meta.url));
var PLUGIN_DIR = join(MODULE_DIR, "../..");
var DEFAULT_PUBLISH_DIR = ".next";
var SERVER_HANDLER_NAME = "___netlify-server-handler";
var EDGE_HANDLER_NAME = "___netlify-edge-handler";
var PluginContext = class {
  utils;
  netlifyConfig;
  pluginName;
  pluginVersion;
  constants;
  packageJSON;
  /** Absolute path of the next runtime plugin directory */
  pluginDir = PLUGIN_DIR;
  get relPublishDir() {
    return this.constants.PUBLISH_DIR ?? join(this.packagePath, DEFAULT_PUBLISH_DIR);
  }
  /** Absolute path of the publish directory */
  get publishDir() {
    return resolve(this.relPublishDir);
  }
  /**
   * Relative package path in non monorepo setups this is an empty string
   * @example ''
   * @example 'apps/my-app'
   */
  get packagePath() {
    return this.constants.PACKAGE_PATH || "";
  }
  /**
   * The working directory inside the lambda that is used for monorepos to execute the serverless function
   */
  get lambdaWorkingDirectory() {
    return join("/var/task", this.distFolder);
  }
  /**
   * Retrieves the root of the `.next/standalone` directory
   */
  get standaloneRootDir() {
    return join(this.publishDir, "standalone");
  }
  /**
   * The resolved relative next dist directory defaults to `.next`,
   * but can be configured through the next.config.js. For monorepos this will include the packagePath
   * If we need just the plain dist dir use the `nextDistDir`
   */
  get distDir() {
    const dir = this.buildConfig.distDir ?? DEFAULT_PUBLISH_DIR;
    return relative(process.cwd(), resolve(this.packagePath, dir));
  }
  /** The dist folder represents the parent directory of the .next folder or custom distDir */
  get distFolder() {
    return join(this.distDir, "..");
  }
  /** The `.next` folder or what the custom dist dir is set to */
  get nextDistDir() {
    return relative(this.distFolder, this.distDir);
  }
  /** Retrieves the `.next/standalone/` directory monorepo aware */
  get standaloneDir() {
    return join(this.standaloneRootDir, this.distFolder);
  }
  /**
   * Absolute path of the directory that is published and deployed to the Netlify CDN
   * Will be swapped with the publish directory
   * `.netlify/static`
   */
  get staticDir() {
    return this.resolve(".netlify/static");
  }
  /**
   * Absolute path of the directory that will be deployed to the blob store
   * `.netlify/blobs/deploy`
   */
  get blobDir() {
    return this.resolve(".netlify/blobs/deploy");
  }
  /**
   * Absolute path of the directory containing the files for the serverless lambda function
   * `.netlify/functions-internal`
   */
  get serverFunctionsDir() {
    return this.resolve(".netlify/functions-internal");
  }
  /** Absolute path of the server handler */
  get serverHandlerRootDir() {
    return join(this.serverFunctionsDir, SERVER_HANDLER_NAME);
  }
  get serverHandlerDir() {
    if (this.packagePath.length === 0) {
      return this.serverHandlerRootDir;
    }
    return join(this.serverHandlerRootDir, this.distFolder);
  }
  get nextServerHandler() {
    if (this.packagePath.length !== 0) {
      return join(this.lambdaWorkingDirectory, ".netlify/dist/run/handlers/server.js");
    }
    return "./.netlify/dist/run/handlers/server.js";
  }
  /**
   * Absolute path of the directory containing the files for deno edge functions
   * `.netlify/edge-functions`
   */
  get edgeFunctionsDir() {
    return this.resolve(".netlify/edge-functions");
  }
  /** Absolute path of the edge handler */
  get edgeHandlerDir() {
    return join(this.edgeFunctionsDir, EDGE_HANDLER_NAME);
  }
  constructor(options) {
    this.packageJSON = JSON.parse(readFileSync(join(PLUGIN_DIR, "package.json"), "utf-8"));
    this.pluginName = this.packageJSON.name;
    this.pluginVersion = this.packageJSON.version;
    this.constants = options.constants;
    this.utils = options.utils;
    this.netlifyConfig = options.netlifyConfig;
  }
  /** Resolves a path correctly with mono repository awareness  */
  resolve(...args) {
    return resolve(this.constants.PACKAGE_PATH || "", ...args);
  }
  /** Get the next prerender-manifest.json */
  async getPrerenderManifest() {
    return JSON.parse(await readFile(join(this.publishDir, "prerender-manifest.json"), "utf-8"));
  }
  /**
   * Get Next.js middleware config from the build output
   */
  async getMiddlewareManifest() {
    return JSON.parse(
      await readFile(join(this.publishDir, "server/middleware-manifest.json"), "utf-8")
    );
  }
  // don't make private as it is handy inside testing to override the config
  _buildConfig = null;
  /** Get Next Config from build output **/
  get buildConfig() {
    if (!this._buildConfig) {
      this._buildConfig = JSON.parse(
        readFileSync(join(this.publishDir, "required-server-files.json"), "utf-8")
      ).config;
    }
    return this._buildConfig;
  }
  /**
   * Get Next.js routes manifest from the build output
   */
  async getRoutesManifest() {
    return JSON.parse(await readFile(join(this.publishDir, "routes-manifest.json"), "utf-8"));
  }
  /** Fails a build with a message and an optional error */
  failBuild(message, error) {
    return this.utils.build.failBuild(message, error instanceof Error ? { error } : void 0);
  }
};

export {
  SERVER_HANDLER_NAME,
  EDGE_HANDLER_NAME,
  PluginContext
};
