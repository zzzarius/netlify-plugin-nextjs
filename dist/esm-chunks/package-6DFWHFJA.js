
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import "./chunk-5JVNISGM.js";

// package.json
var name = "@netlify/plugin-nextjs";
var version = "5.0.0-beta.9";
var description = "Run Next.js seamlessly on Netlify";
var main = "./dist/index.js";
var type = "module";
var files = [
  "dist",
  "edge-runtime",
  "manifest.yml"
];
var engines = {
  node: ">=18.0.0"
};
var scripts = {
  prepack: "clean-package",
  postpack: "clean-package restore",
  pretest: "node tests/prepare.mjs",
  build: "node ./tools/build.js",
  "build:watch": "node ./tools/build.js --watch",
  lint: "eslint --cache --format=codeframe --max-warnings=0 --ext .ts,.cts,.js src",
  test: "vitest",
  "test:ci": "vitest run --reporter=default --retry=3",
  typecheck: "tsc --noEmit",
  e2e: "playwright test",
  "e2e:ci": "playwright test"
};
var repository = {
  type: "git",
  url: "git+https://github.com/netlify/next-runtime-minimal.git"
};
var keywords = [
  "nextjs",
  "netlify",
  "next",
  "netlify-runtime"
];
var license = "MIT";
var bugs = {
  url: "https://github.com/netlify/next-runtime-minimal/issues"
};
var homepage = "https://github.com/netlify/next-runtime-minimal#readme";
var devDependencies = {
  "@fastly/http-compute-js": "1.1.4",
  "@netlify/blobs": "^6.5.0",
  "@netlify/build": "^29.35.1",
  "@netlify/edge-bundler": "^11.2.2",
  "@netlify/edge-functions": "^2.3.1",
  "@netlify/eslint-config-node": "^7.0.1",
  "@netlify/functions": "^2.5.1",
  "@netlify/serverless-functions-api": "^1.10.1",
  "@netlify/zip-it-and-ship-it": "^9.29.2",
  "@opentelemetry/api": "^1.7.0",
  "@opentelemetry/sdk-node": "^0.48.0",
  "@opentelemetry/exporter-trace-otlp-http": "^0.48.0",
  "@opentelemetry/resources": "^1.21.0",
  "@opentelemetry/semantic-conventions": "^1.21.0",
  "@opentelemetry/sdk-trace-node": "^1.21.0",
  "@playwright/test": "^1.40.0",
  "@types/node": "^20.9.2",
  "@types/uuid": "^9.0.6",
  "@vercel/nft": "^0.26.0",
  cheerio: "^1.0.0-rc.12",
  "clean-package": "^2.2.0",
  esbuild: "^0.20.0",
  execa: "^8.0.1",
  "fast-glob": "^3.3.2",
  "fs-monkey": "^1.0.5",
  "get-port": "^7.0.0",
  "lambda-local": "^2.1.2",
  memfs: "^4.6.0",
  "mock-require": "^3.0.3",
  msw: "^2.0.7",
  next: "^14.0.4",
  os: "^0.1.2",
  outdent: "^0.8.0",
  "p-limit": "^4.0.0",
  typescript: "^5.1.6",
  unionfs: "^4.5.1",
  uuid: "^9.0.1",
  vitest: "^1.2.2"
};
var clean_package = {
  indent: 2,
  remove: [
    "dependencies",
    "devDependencies",
    "scripts"
  ]
};
var package_default = {
  name,
  version,
  description,
  main,
  type,
  files,
  engines,
  scripts,
  repository,
  keywords,
  license,
  bugs,
  homepage,
  devDependencies,
  "clean-package": clean_package
};
export {
  bugs,
  clean_package as "clean-package",
  package_default as default,
  description,
  devDependencies,
  engines,
  files,
  homepage,
  keywords,
  license,
  main,
  name,
  repository,
  scripts,
  type,
  version
};
