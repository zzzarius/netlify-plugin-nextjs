
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-5JVNISGM.js";

// node_modules/@netlify/functions/dist/lib/system_logger.js
var require_system_logger = __commonJS({
  "node_modules/@netlify/functions/dist/lib/system_logger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.systemLogger = exports.LogLevel = void 0;
    var process_1 = __require("process");
    var systemLogTag = "__nfSystemLog";
    var serializeError = (error) => {
      const cause = error?.cause instanceof Error ? serializeError(error.cause) : error.cause;
      return {
        error: error.message,
        error_cause: cause,
        error_stack: error.stack
      };
    };
    var LogLevel2;
    (function(LogLevel3) {
      LogLevel3[LogLevel3["Debug"] = 1] = "Debug";
      LogLevel3[LogLevel3["Log"] = 2] = "Log";
      LogLevel3[LogLevel3["Error"] = 3] = "Error";
    })(LogLevel2 = exports.LogLevel || (exports.LogLevel = {}));
    var SystemLogger = class _SystemLogger {
      fields;
      logLevel;
      constructor(fields = {}, logLevel = LogLevel2.Log) {
        this.fields = fields;
        this.logLevel = logLevel;
      }
      doLog(logger, message) {
        if (process_1.env.NETLIFY_DEV && !process_1.env.NETLIFY_ENABLE_SYSTEM_LOGGING) {
          return;
        }
        logger(systemLogTag, JSON.stringify({ msg: message, fields: this.fields }));
      }
      log(message) {
        if (this.logLevel > LogLevel2.Log) {
          return;
        }
        this.doLog(console.log, message);
      }
      debug(message) {
        if (this.logLevel > LogLevel2.Debug) {
          return;
        }
        this.doLog(console.debug, message);
      }
      error(message) {
        if (this.logLevel > LogLevel2.Error) {
          return;
        }
        this.doLog(console.error, message);
      }
      withLogLevel(level) {
        return new _SystemLogger(this.fields, level);
      }
      withFields(fields) {
        return new _SystemLogger({
          ...this.fields,
          ...fields
        }, this.logLevel);
      }
      withError(error) {
        const fields = error instanceof Error ? serializeError(error) : { error };
        return this.withFields(fields);
      }
    };
    exports.systemLogger = new SystemLogger();
  }
});

// node_modules/@netlify/functions/dist/internal.js
var require_internal = __commonJS({
  "node_modules/@netlify/functions/dist/internal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LogLevel = exports.systemLogger = void 0;
    var system_logger_js_1 = require_system_logger();
    Object.defineProperty(exports, "systemLogger", { enumerable: true, get: function() {
      return system_logger_js_1.systemLogger;
    } });
    Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function() {
      return system_logger_js_1.LogLevel;
    } });
  }
});

// src/run/systemlog.ts
var import_internal = __toESM(require_internal(), 1);

export {
  import_internal
};
