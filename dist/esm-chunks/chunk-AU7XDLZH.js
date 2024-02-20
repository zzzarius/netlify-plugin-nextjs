
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  encodeBlobKey
} from "./chunk-TYCYFZ22.js";

// node_modules/@netlify/blobs/dist/main.js
import { Buffer } from "buffer";
import { env } from "process";
import { Buffer as Buffer2 } from "buffer";
import { Buffer as Buffer3 } from "buffer";
import stream from "stream";
import { promisify } from "util";
var BlobsConsistencyError = class extends Error {
  constructor() {
    super(
      `Netlify Blobs has failed to perform a read using strong consistency because the environment has not been configured with a 'uncachedEdgeURL' property`
    );
    this.name = "BlobsConsistencyError";
  }
};
var getEnvironmentContext = () => {
  const context = globalThis.netlifyBlobsContext || env.NETLIFY_BLOBS_CONTEXT;
  if (typeof context !== "string" || !context) {
    return {};
  }
  const data = Buffer.from(context, "base64").toString();
  try {
    return JSON.parse(data);
  } catch {
  }
  return {};
};
var MissingBlobsEnvironmentError = class extends Error {
  constructor(requiredProperties) {
    super(
      `The environment has not been configured to use Netlify Blobs. To use it manually, supply the following properties when creating a store: ${requiredProperties.join(
        ", "
      )}`
    );
    this.name = "MissingBlobsEnvironmentError";
  }
};
var BASE64_PREFIX = "b64;";
var METADATA_HEADER_INTERNAL = "x-amz-meta-user";
var METADATA_HEADER_EXTERNAL = "netlify-blobs-metadata";
var METADATA_MAX_SIZE = 2 * 1024;
var encodeMetadata = (metadata) => {
  if (!metadata) {
    return null;
  }
  const encodedObject = Buffer2.from(JSON.stringify(metadata)).toString("base64");
  const payload = `b64;${encodedObject}`;
  if (METADATA_HEADER_EXTERNAL.length + payload.length > METADATA_MAX_SIZE) {
    throw new Error("Metadata object exceeds the maximum size");
  }
  return payload;
};
var decodeMetadata = (header) => {
  if (!header || !header.startsWith(BASE64_PREFIX)) {
    return {};
  }
  const encodedData = header.slice(BASE64_PREFIX.length);
  const decodedData = Buffer2.from(encodedData, "base64").toString();
  const metadata = JSON.parse(decodedData);
  return metadata;
};
var getMetadataFromResponse = (response) => {
  if (!response.headers) {
    return {};
  }
  const value = response.headers.get(METADATA_HEADER_EXTERNAL) || response.headers.get(METADATA_HEADER_INTERNAL);
  try {
    return decodeMetadata(value);
  } catch {
    throw new Error(
      "An internal error occurred while trying to retrieve the metadata for an entry. Please try updating to the latest version of the Netlify Blobs client."
    );
  }
};
var DEFAULT_RETRY_DELAY = 5e3;
var MIN_RETRY_DELAY = 1e3;
var MAX_RETRY = 5;
var RATE_LIMIT_HEADER = "X-RateLimit-Reset";
var fetchAndRetry = async (fetch, url, options, attemptsLeft = MAX_RETRY) => {
  try {
    const res = await fetch(url, options);
    if (attemptsLeft > 0 && (res.status === 429 || res.status >= 500)) {
      const delay = getDelay(res.headers.get(RATE_LIMIT_HEADER));
      await sleep(delay);
      return fetchAndRetry(fetch, url, options, attemptsLeft - 1);
    }
    return res;
  } catch (error) {
    if (attemptsLeft === 0) {
      throw error;
    }
    const delay = getDelay();
    await sleep(delay);
    return fetchAndRetry(fetch, url, options, attemptsLeft - 1);
  }
};
var getDelay = (rateLimitReset) => {
  if (!rateLimitReset) {
    return DEFAULT_RETRY_DELAY;
  }
  return Math.max(Number(rateLimitReset) * 1e3 - Date.now(), MIN_RETRY_DELAY);
};
var sleep = (ms) => new Promise((resolve2) => {
  setTimeout(resolve2, ms);
});
var Client = class {
  constructor({ apiURL, consistency, edgeURL, fetch, siteID, token, uncachedEdgeURL }) {
    this.apiURL = apiURL;
    this.consistency = consistency ?? "eventual";
    this.edgeURL = edgeURL;
    this.fetch = fetch ?? globalThis.fetch;
    this.siteID = siteID;
    this.token = token;
    this.uncachedEdgeURL = uncachedEdgeURL;
    if (!this.fetch) {
      throw new Error(
        "Netlify Blobs could not find a `fetch` client in the global scope. You can either update your runtime to a version that includes `fetch` (like Node.js 18.0.0 or above), or you can supply your own implementation using the `fetch` property."
      );
    }
  }
  async getFinalRequest({
    consistency: opConsistency,
    key,
    metadata,
    method,
    parameters = {},
    storeName
  }) {
    const encodedMetadata = encodeMetadata(metadata);
    const consistency = opConsistency ?? this.consistency;
    if (this.edgeURL) {
      if (consistency === "strong" && !this.uncachedEdgeURL) {
        throw new BlobsConsistencyError();
      }
      const headers = {
        authorization: `Bearer ${this.token}`
      };
      if (encodedMetadata) {
        headers[METADATA_HEADER_INTERNAL] = encodedMetadata;
      }
      const path = key ? `/${this.siteID}/${storeName}/${key}` : `/${this.siteID}/${storeName}`;
      const url2 = new URL(path, consistency === "strong" ? this.uncachedEdgeURL : this.edgeURL);
      for (const key2 in parameters) {
        url2.searchParams.set(key2, parameters[key2]);
      }
      return {
        headers,
        url: url2.toString()
      };
    }
    const apiHeaders = { authorization: `Bearer ${this.token}` };
    const url = new URL(`/api/v1/sites/${this.siteID}/blobs`, this.apiURL ?? "https://api.netlify.com");
    for (const key2 in parameters) {
      url.searchParams.set(key2, parameters[key2]);
    }
    url.searchParams.set("context", storeName);
    if (key === void 0) {
      return {
        headers: apiHeaders,
        url: url.toString()
      };
    }
    url.pathname += `/${key}`;
    if (encodedMetadata) {
      apiHeaders[METADATA_HEADER_EXTERNAL] = encodedMetadata;
    }
    if (method === "head") {
      return {
        headers: apiHeaders,
        url: url.toString()
      };
    }
    const res = await this.fetch(url.toString(), { headers: apiHeaders, method });
    if (res.status !== 200) {
      throw new Error(`Netlify Blobs has generated an internal error: ${res.status} response`);
    }
    const { url: signedURL } = await res.json();
    const userHeaders = encodedMetadata ? { [METADATA_HEADER_INTERNAL]: encodedMetadata } : void 0;
    return {
      headers: userHeaders,
      url: signedURL
    };
  }
  async makeRequest({
    body,
    consistency,
    headers: extraHeaders,
    key,
    metadata,
    method,
    parameters,
    storeName
  }) {
    const { headers: baseHeaders = {}, url } = await this.getFinalRequest({
      consistency,
      key,
      metadata,
      method,
      parameters,
      storeName
    });
    const headers = {
      ...baseHeaders,
      ...extraHeaders
    };
    if (method === "put") {
      headers["cache-control"] = "max-age=0, stale-while-revalidate=60";
    }
    const options = {
      body,
      headers,
      method
    };
    if (body instanceof ReadableStream) {
      options.duplex = "half";
    }
    return fetchAndRetry(this.fetch, url, options);
  }
};
var getClientOptions = (options, contextOverride) => {
  const context = contextOverride ?? getEnvironmentContext();
  const siteID = context.siteID ?? options.siteID;
  const token = context.token ?? options.token;
  if (!siteID || !token) {
    throw new MissingBlobsEnvironmentError(["siteID", "token"]);
  }
  const clientOptions = {
    apiURL: context.apiURL ?? options.apiURL,
    consistency: options.consistency,
    edgeURL: context.edgeURL ?? options.edgeURL,
    fetch: options.fetch,
    siteID,
    token,
    uncachedEdgeURL: context.uncachedEdgeURL ?? options.uncachedEdgeURL
  };
  return clientOptions;
};
var BlobsInternalError = class extends Error {
  constructor(statusCode) {
    super(`Netlify Blobs has generated an internal error: ${statusCode} response`);
    this.name = "BlobsInternalError";
  }
};
var collectIterator = async (iterator) => {
  const result = [];
  for await (const item of iterator) {
    result.push(item);
  }
  return result;
};
var Store = class _Store {
  constructor(options) {
    this.client = options.client;
    this.consistency = options.consistency ?? "eventual";
    if ("deployID" in options) {
      _Store.validateDeployID(options.deployID);
      this.name = `deploy:${options.deployID}`;
    } else {
      _Store.validateStoreName(options.name);
      this.name = options.name;
    }
  }
  async delete(key) {
    const res = await this.client.makeRequest({ key, method: "delete", storeName: this.name });
    if (![200, 204, 404].includes(res.status)) {
      throw new BlobsInternalError(res.status);
    }
  }
  async get(key, options) {
    const { consistency, type } = options ?? {};
    const res = await this.client.makeRequest({ consistency, key, method: "get", storeName: this.name });
    if (res.status === 404) {
      return null;
    }
    if (res.status !== 200) {
      throw new BlobsInternalError(res.status);
    }
    if (type === void 0 || type === "text") {
      return res.text();
    }
    if (type === "arrayBuffer") {
      return res.arrayBuffer();
    }
    if (type === "blob") {
      return res.blob();
    }
    if (type === "json") {
      return res.json();
    }
    if (type === "stream") {
      return res.body;
    }
    throw new BlobsInternalError(res.status);
  }
  async getMetadata(key, { consistency } = {}) {
    const res = await this.client.makeRequest({ consistency, key, method: "head", storeName: this.name });
    if (res.status === 404) {
      return null;
    }
    if (res.status !== 200 && res.status !== 304) {
      throw new BlobsInternalError(res.status);
    }
    const etag = res?.headers.get("etag") ?? void 0;
    const metadata = getMetadataFromResponse(res);
    const result = {
      etag,
      metadata
    };
    return result;
  }
  async getWithMetadata(key, options) {
    const { consistency, etag: requestETag, type } = options ?? {};
    const headers = requestETag ? { "if-none-match": requestETag } : void 0;
    const res = await this.client.makeRequest({
      consistency,
      headers,
      key,
      method: "get",
      storeName: this.name
    });
    if (res.status === 404) {
      return null;
    }
    if (res.status !== 200 && res.status !== 304) {
      throw new BlobsInternalError(res.status);
    }
    const responseETag = res?.headers.get("etag") ?? void 0;
    const metadata = getMetadataFromResponse(res);
    const result = {
      etag: responseETag,
      metadata
    };
    if (res.status === 304 && requestETag) {
      return { data: null, ...result };
    }
    if (type === void 0 || type === "text") {
      return { data: await res.text(), ...result };
    }
    if (type === "arrayBuffer") {
      return { data: await res.arrayBuffer(), ...result };
    }
    if (type === "blob") {
      return { data: await res.blob(), ...result };
    }
    if (type === "json") {
      return { data: await res.json(), ...result };
    }
    if (type === "stream") {
      return { data: res.body, ...result };
    }
    throw new Error(`Invalid 'type' property: ${type}. Expected: arrayBuffer, blob, json, stream, or text.`);
  }
  list(options = {}) {
    const iterator = this.getListIterator(options);
    if (options.paginate) {
      return iterator;
    }
    return collectIterator(iterator).then(
      (items) => items.reduce(
        (acc, item) => ({
          blobs: [...acc.blobs, ...item.blobs],
          directories: [...acc.directories, ...item.directories]
        }),
        { blobs: [], directories: [] }
      )
    );
  }
  async set(key, data, { metadata } = {}) {
    _Store.validateKey(key);
    const res = await this.client.makeRequest({
      body: data,
      key,
      metadata,
      method: "put",
      storeName: this.name
    });
    if (res.status !== 200) {
      throw new BlobsInternalError(res.status);
    }
  }
  async setJSON(key, data, { metadata } = {}) {
    _Store.validateKey(key);
    const payload = JSON.stringify(data);
    const headers = {
      "content-type": "application/json"
    };
    const res = await this.client.makeRequest({
      body: payload,
      headers,
      key,
      metadata,
      method: "put",
      storeName: this.name
    });
    if (res.status !== 200) {
      throw new BlobsInternalError(res.status);
    }
  }
  static formatListResultBlob(result) {
    if (!result.key) {
      return null;
    }
    return {
      etag: result.etag,
      key: result.key
    };
  }
  static validateKey(key) {
    if (key === "") {
      throw new Error("Blob key must not be empty.");
    }
    if (key.startsWith("/") || key.startsWith("%2F")) {
      throw new Error("Blob key must not start with forward slash (/).");
    }
    if (Buffer3.byteLength(key, "utf8") > 600) {
      throw new Error(
        "Blob key must be a sequence of Unicode characters whose UTF-8 encoding is at most 600 bytes long."
      );
    }
  }
  static validateDeployID(deployID) {
    if (!/^\w{1,24}$/.test(deployID)) {
      throw new Error(`'${deployID}' is not a valid Netlify deploy ID.`);
    }
  }
  static validateStoreName(name) {
    if (name.startsWith("deploy:") || name.startsWith("deploy%3A1")) {
      throw new Error("Store name must not start with the `deploy:` reserved keyword.");
    }
    if (name.includes("/") || name.includes("%2F")) {
      throw new Error("Store name must not contain forward slashes (/).");
    }
    if (Buffer3.byteLength(name, "utf8") > 64) {
      throw new Error(
        "Store name must be a sequence of Unicode characters whose UTF-8 encoding is at most 64 bytes long."
      );
    }
  }
  getListIterator(options) {
    const { client, name: storeName } = this;
    const parameters = {};
    if (options?.prefix) {
      parameters.prefix = options.prefix;
    }
    if (options?.directories) {
      parameters.directories = "true";
    }
    return {
      [Symbol.asyncIterator]() {
        let currentCursor = null;
        let done = false;
        return {
          async next() {
            if (done) {
              return { done: true, value: void 0 };
            }
            const nextParameters = { ...parameters };
            if (currentCursor !== null) {
              nextParameters.cursor = currentCursor;
            }
            const res = await client.makeRequest({
              method: "get",
              parameters: nextParameters,
              storeName
            });
            const page = await res.json();
            if (page.next_cursor) {
              currentCursor = page.next_cursor;
            } else {
              done = true;
            }
            const blobs = (page.blobs ?? []).map(_Store.formatListResultBlob).filter(Boolean);
            return {
              done: false,
              value: {
                blobs,
                directories: page.directories ?? []
              }
            };
          }
        };
      }
    };
  }
};
var getDeployStore = (options = {}) => {
  const context = getEnvironmentContext();
  const deployID = options.deployID ?? context.deployID;
  if (!deployID) {
    throw new MissingBlobsEnvironmentError(["deployID"]);
  }
  const clientOptions = getClientOptions(options, context);
  const client = new Client(clientOptions);
  return new Store({ client, deployID });
};
var pipeline = promisify(stream.pipeline);

// src/run/headers.ts
var generateNetlifyVaryValues = ({ headers, languages, cookies }) => {
  const values = [];
  if (headers.length !== 0) {
    values.push(`header=${headers.join(`|`)}`);
  }
  if (languages.length !== 0) {
    values.push(`language=${languages.join(`|`)}`);
  }
  if (cookies.length !== 0) {
    values.push(`cookie=${cookies.join(`|`)}`);
  }
  return values.join(",");
};
var getHeaderValueArray = (header) => {
  return header.split(",").map((value) => value.trim());
};
var omitHeaderValues = (header, values) => {
  const headerValues = getHeaderValueArray(header);
  const filteredValues = headerValues.filter(
    (value) => !values.some((val) => value.startsWith(val))
  );
  return filteredValues.join(", ");
};
var mapHeaderValues = (header, callback) => {
  const headerValues = getHeaderValueArray(header);
  const mappedValues = headerValues.map(callback);
  return mappedValues.join(", ");
};
var setVaryHeaders = (headers, request, { basePath, i18n }) => {
  const netlifyVaryValues = {
    headers: ["x-nextjs-data"],
    languages: [],
    cookies: ["__prerender_bypass", "__next_preview_data"]
  };
  const vary = headers.get("vary");
  if (vary !== null) {
    netlifyVaryValues.headers.push(...getHeaderValueArray(vary));
  }
  const path = new URL(request.url).pathname;
  const locales = i18n && i18n.localeDetection !== false ? i18n.locales : [];
  if (locales.length > 1 && (path === "/" || path === basePath)) {
    netlifyVaryValues.languages.push(...locales);
    netlifyVaryValues.cookies.push(`NEXT_LOCALE`);
  }
  headers.set(`netlify-vary`, generateNetlifyVaryValues(netlifyVaryValues));
};
var fetchBeforeNextPatchedIt = globalThis.fetch;
var adjustDateHeader = async ({
  headers,
  request,
  span,
  tracer,
  requestContext
}) => {
  const cacheState = headers.get("x-nextjs-cache");
  const isServedFromCache = cacheState === "HIT" || cacheState === "STALE";
  span.setAttributes({
    "x-nextjs-cache": cacheState ?? void 0,
    isServedFromCache
  });
  if (!isServedFromCache) {
    return;
  }
  const key = new URL(request.url).pathname;
  let lastModified;
  if (requestContext.responseCacheGetLastModified) {
    lastModified = requestContext.responseCacheGetLastModified;
  } else {
    span.recordException(
      new Error("lastModified not found in requestContext, falling back to trying blobs")
    );
    span.setAttributes({
      severity: "alert",
      warning: true
    });
    const blobKey = await encodeBlobKey(key);
    const blobStore = getDeployStore({ fetch: fetchBeforeNextPatchedIt, consistency: "strong" });
    lastModified = await tracer.startActiveSpan(
      "get cache to calculate date header",
      async (getBlobForDateSpan) => {
        getBlobForDateSpan.setAttributes({
          key,
          blobKey
        });
        const blob = await blobStore.get(blobKey, { type: "json" }) ?? {};
        getBlobForDateSpan.addEvent(blob ? "Cache hit" : "Cache miss");
        getBlobForDateSpan.end();
        return blob.lastModified;
      }
    );
  }
  if (!lastModified) {
    span.recordException(
      new Error(
        "lastModified not found in either requestContext or blobs, date header for cached response is not set"
      )
    );
    span.setAttributes({
      severity: "alert",
      warning: true
    });
    return;
  }
  const lastModifiedDate = new Date(lastModified);
  headers.set("x-nextjs-date", headers.get("date") ?? lastModifiedDate.toUTCString());
  headers.set("date", lastModifiedDate.toUTCString());
};
var setCacheControlHeaders = (headers, request) => {
  const cacheControl = headers.get("cache-control");
  if (cacheControl !== null && ["GET", "HEAD"].includes(request.method) && !headers.has("cdn-cache-control") && !headers.has("netlify-cdn-cache-control")) {
    const browserCacheControl = omitHeaderValues(cacheControl, [
      "s-maxage",
      "stale-while-revalidate"
    ]);
    const cdnCacheControl = (
      // if we are serving already stale response, instruct edge to not attempt to cache that response
      headers.get("x-nextjs-cache") === "STALE" ? "public, max-age=0, must-revalidate" : mapHeaderValues(
        cacheControl,
        (value) => value === "stale-while-revalidate" ? "stale-while-revalidate=31536000" : value
      )
    );
    headers.set("cache-control", browserCacheControl || "public, max-age=0, must-revalidate");
    headers.set("netlify-cdn-cache-control", cdnCacheControl);
  }
};
var setCacheTagsHeaders = (headers, request, manifest) => {
  const path = new URL(request.url).pathname;
  const tags = manifest[path];
  if (tags !== void 0) {
    headers.set("netlify-cache-tag", tags);
  }
};
var NEXT_CACHE_TO_CACHE_STATUS = {
  HIT: `hit`,
  MISS: `fwd=miss`,
  STALE: `hit; fwd=stale`
};
var setCacheStatusHeader = (headers) => {
  const nextCache = headers.get("x-nextjs-cache");
  if (typeof nextCache === "string") {
    if (nextCache in NEXT_CACHE_TO_CACHE_STATUS) {
      const cacheStatus = NEXT_CACHE_TO_CACHE_STATUS[nextCache];
      headers.set("cache-status", `"Next.js"; ${cacheStatus}`);
    }
    headers.delete("x-nextjs-cache");
  }
};

export {
  setVaryHeaders,
  adjustDateHeader,
  setCacheControlHeaders,
  setCacheTagsHeaders,
  setCacheStatusHeader
};
