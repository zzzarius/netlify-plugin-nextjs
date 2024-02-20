
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-5JVNISGM.js";

// node_modules/is-promise/index.js
var require_is_promise = __commonJS({
  "node_modules/is-promise/index.js"(exports, module) {
    module.exports = isPromise;
    module.exports.default = isPromise;
    function isPromise(obj) {
      return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
    }
  }
});

// node_modules/@netlify/functions/dist/lib/consts.js
var require_consts = __commonJS({
  "node_modules/@netlify/functions/dist/lib/consts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.METADATA_VERSION = exports.HTTP_STATUS_OK = exports.HTTP_STATUS_METHOD_NOT_ALLOWED = exports.BUILDER_FUNCTIONS_FLAG = void 0;
    var BUILDER_FUNCTIONS_FLAG = true;
    exports.BUILDER_FUNCTIONS_FLAG = BUILDER_FUNCTIONS_FLAG;
    var HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
    exports.HTTP_STATUS_METHOD_NOT_ALLOWED = HTTP_STATUS_METHOD_NOT_ALLOWED;
    var HTTP_STATUS_OK = 200;
    exports.HTTP_STATUS_OK = HTTP_STATUS_OK;
    var METADATA_VERSION = 1;
    exports.METADATA_VERSION = METADATA_VERSION;
  }
});

// node_modules/@netlify/functions/dist/lib/builder.js
var require_builder = __commonJS({
  "node_modules/@netlify/functions/dist/lib/builder.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.builder = void 0;
    var is_promise_1 = __importDefault(require_is_promise());
    var consts_js_1 = require_consts();
    var augmentResponse = (response) => {
      if (!response) {
        return response;
      }
      const metadata = { version: consts_js_1.METADATA_VERSION, builder_function: consts_js_1.BUILDER_FUNCTIONS_FLAG, ttl: response.ttl || 0 };
      return {
        ...response,
        metadata
      };
    };
    var wrapHandler = (handler) => (
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      (event, context, callback) => {
        if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD") {
          return Promise.resolve({
            body: "Method Not Allowed",
            statusCode: consts_js_1.HTTP_STATUS_METHOD_NOT_ALLOWED
          });
        }
        const modifiedEvent = {
          ...event,
          multiValueQueryStringParameters: {},
          queryStringParameters: {}
        };
        const wrappedCallback = (error, response) => (
          // eslint-disable-next-line promise/prefer-await-to-callbacks
          callback ? callback(error, augmentResponse(response)) : null
        );
        const execution = handler(modifiedEvent, context, wrappedCallback);
        if ((0, is_promise_1.default)(execution)) {
          return execution.then(augmentResponse);
        }
        return execution;
      }
    );
    exports.builder = wrapHandler;
  }
});

// node_modules/@netlify/functions/dist/lib/purge_cache.js
var require_purge_cache = __commonJS({
  "node_modules/@netlify/functions/dist/lib/purge_cache.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.purgeCache = void 0;
    var process_1 = __require("process");
    var purgeCache2 = async (options = {}) => {
      if (globalThis.fetch === void 0) {
        throw new Error("`fetch` is not available. Please ensure you're using Node.js version 18.0.0 or above. Refer to https://ntl.fyi/functions-runtime for more information.");
      }
      const payload = {
        cache_tags: options.tags,
        deploy_alias: options.deployAlias
      };
      const token = process_1.env.NETLIFY_PURGE_API_TOKEN || options.token;
      if ("siteSlug" in options) {
        payload.site_slug = options.siteSlug;
      } else if ("domain" in options) {
        payload.domain = options.domain;
      } else {
        const siteID = options.siteID || process_1.env.SITE_ID;
        if (!siteID) {
          throw new Error("The Netlify site ID was not found in the execution environment. Please supply it manually using the `siteID` property.");
        }
        payload.site_id = siteID;
      }
      if (!token) {
        throw new Error("The cache purge API token was not found in the execution environment. Please supply it manually using the `token` property.");
      }
      const apiURL = options.apiURL || "https://api.netlify.com";
      const response = await fetch(`${apiURL}/api/v1/purge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`Cache purge API call returned an unexpected status code: ${response.status}`);
      }
    };
    exports.purgeCache = purgeCache2;
  }
});

// node_modules/@netlify/functions/dist/lib/schedule.js
var require_schedule = __commonJS({
  "node_modules/@netlify/functions/dist/lib/schedule.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.schedule = void 0;
    var schedule = (cron, handler) => handler;
    exports.schedule = schedule;
  }
});

// node_modules/@netlify/functions/dist/lib/stream.js
var require_stream = __commonJS({
  "node_modules/@netlify/functions/dist/lib/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stream = void 0;
    var node_stream_1 = __require("node:stream");
    var node_util_1 = __require("node:util");
    var pipeline = (0, node_util_1.promisify)(node_stream_1.pipeline);
    var stream = (handler) => awslambda.streamifyResponse(async (event, responseStream, context) => {
      const { body, ...httpResponseMetadata } = await handler(event, context);
      const responseBody = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);
      if (typeof body === "undefined") {
        responseBody.end();
      } else if (typeof body === "string") {
        responseBody.write(body);
        responseBody.end();
      } else {
        await pipeline(body, responseBody);
      }
    });
    exports.stream = stream;
  }
});

// node_modules/@netlify/functions/dist/function/index.js
var require_function = __commonJS({
  "node_modules/@netlify/functions/dist/function/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@netlify/functions/dist/main.js
var require_main = __commonJS({
  "node_modules/@netlify/functions/dist/main.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stream = exports.schedule = exports.purgeCache = exports.builder = void 0;
    var builder_js_1 = require_builder();
    Object.defineProperty(exports, "builder", { enumerable: true, get: function() {
      return builder_js_1.builder;
    } });
    var purge_cache_js_1 = require_purge_cache();
    Object.defineProperty(exports, "purgeCache", { enumerable: true, get: function() {
      return purge_cache_js_1.purgeCache;
    } });
    var schedule_js_1 = require_schedule();
    Object.defineProperty(exports, "schedule", { enumerable: true, get: function() {
      return schedule_js_1.schedule;
    } });
    var stream_js_1 = require_stream();
    Object.defineProperty(exports, "stream", { enumerable: true, get: function() {
      return stream_js_1.stream;
    } });
    __exportStar(require_function(), exports);
  }
});

// src/run/revalidate.ts
var import_functions = __toESM(require_main(), 1);
var nextResponseProxy = (res) => {
  return new Proxy(res, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(target, key) {
      const originalValue = target[key];
      if (key === "revalidate") {
        return async function newRevalidate(...args) {
          try {
            console.debug("Purging cache for:", [args[0]]);
            await (0, import_functions.purgeCache)({ tags: [`_N_T_${args[0]}`] });
          } catch {
            throw new Error(
              `An internal error occurred while trying to purge cache for ${args[0]}}`
            );
          }
          return originalValue?.apply(target, args);
        };
      }
      return originalValue;
    }
  });
};

export {
  nextResponseProxy
};
