"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js
var require_globalThis = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2._globalThis = void 0;
    exports2._globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/api/build/src/platform/node/index.js
var require_node = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/node/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_globalThis(), exports2);
  }
});

// node_modules/@opentelemetry/api/build/src/platform/index.js
var require_platform = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_node(), exports2);
  }
});

// node_modules/@opentelemetry/api/build/src/version.js
var require_version = __commonJS({
  "node_modules/@opentelemetry/api/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VERSION = void 0;
    exports2.VERSION = "1.7.0";
  }
});

// node_modules/@opentelemetry/api/build/src/internal/semver.js
var require_semver = __commonJS({
  "node_modules/@opentelemetry/api/build/src/internal/semver.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isCompatible = exports2._makeCompatibilityCheck = void 0;
    var version_1 = require_version();
    var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    function _makeCompatibilityCheck(ownVersion) {
      const acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
      const rejectedVersions = /* @__PURE__ */ new Set();
      const myVersionMatch = ownVersion.match(re);
      if (!myVersionMatch) {
        return () => false;
      }
      const ownVersionParsed = {
        major: +myVersionMatch[1],
        minor: +myVersionMatch[2],
        patch: +myVersionMatch[3],
        prerelease: myVersionMatch[4]
      };
      if (ownVersionParsed.prerelease != null) {
        return function isExactmatch(globalVersion) {
          return globalVersion === ownVersion;
        };
      }
      function _reject(v) {
        rejectedVersions.add(v);
        return false;
      }
      function _accept(v) {
        acceptedVersions.add(v);
        return true;
      }
      return function isCompatible(globalVersion) {
        if (acceptedVersions.has(globalVersion)) {
          return true;
        }
        if (rejectedVersions.has(globalVersion)) {
          return false;
        }
        const globalVersionMatch = globalVersion.match(re);
        if (!globalVersionMatch) {
          return _reject(globalVersion);
        }
        const globalVersionParsed = {
          major: +globalVersionMatch[1],
          minor: +globalVersionMatch[2],
          patch: +globalVersionMatch[3],
          prerelease: globalVersionMatch[4]
        };
        if (globalVersionParsed.prerelease != null) {
          return _reject(globalVersion);
        }
        if (ownVersionParsed.major !== globalVersionParsed.major) {
          return _reject(globalVersion);
        }
        if (ownVersionParsed.major === 0) {
          if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
            return _accept(globalVersion);
          }
          return _reject(globalVersion);
        }
        if (ownVersionParsed.minor <= globalVersionParsed.minor) {
          return _accept(globalVersion);
        }
        return _reject(globalVersion);
      };
    }
    exports2._makeCompatibilityCheck = _makeCompatibilityCheck;
    exports2.isCompatible = _makeCompatibilityCheck(version_1.VERSION);
  }
});

// node_modules/@opentelemetry/api/build/src/internal/global-utils.js
var require_global_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/internal/global-utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unregisterGlobal = exports2.getGlobal = exports2.registerGlobal = void 0;
    var platform_1 = require_platform();
    var version_1 = require_version();
    var semver_1 = require_semver();
    var major = version_1.VERSION.split(".")[0];
    var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for(`opentelemetry.js.api.${major}`);
    var _global = platform_1._globalThis;
    function registerGlobal(type, instance, diag, allowOverride = false) {
      var _a;
      const api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
        version: version_1.VERSION
      };
      if (!allowOverride && api[type]) {
        const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type}`);
        diag.error(err.stack || err.message);
        return false;
      }
      if (api.version !== version_1.VERSION) {
        const err = new Error(`@opentelemetry/api: Registration of version v${api.version} for ${type} does not match previously registered API v${version_1.VERSION}`);
        diag.error(err.stack || err.message);
        return false;
      }
      api[type] = instance;
      diag.debug(`@opentelemetry/api: Registered a global for ${type} v${version_1.VERSION}.`);
      return true;
    }
    exports2.registerGlobal = registerGlobal;
    function getGlobal(type) {
      var _a, _b;
      const globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
      if (!globalVersion || !(0, semver_1.isCompatible)(globalVersion)) {
        return;
      }
      return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
    }
    exports2.getGlobal = getGlobal;
    function unregisterGlobal(type, diag) {
      diag.debug(`@opentelemetry/api: Unregistering a global for ${type} v${version_1.VERSION}.`);
      const api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
      if (api) {
        delete api[type];
      }
    }
    exports2.unregisterGlobal = unregisterGlobal;
  }
});

// node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js
var require_ComponentLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagComponentLogger = void 0;
    var global_utils_1 = require_global_utils();
    var DiagComponentLogger = class {
      constructor(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      debug(...args) {
        return logProxy("debug", this._namespace, args);
      }
      error(...args) {
        return logProxy("error", this._namespace, args);
      }
      info(...args) {
        return logProxy("info", this._namespace, args);
      }
      warn(...args) {
        return logProxy("warn", this._namespace, args);
      }
      verbose(...args) {
        return logProxy("verbose", this._namespace, args);
      }
    };
    exports2.DiagComponentLogger = DiagComponentLogger;
    function logProxy(funcName, namespace, args) {
      const logger = (0, global_utils_1.getGlobal)("diag");
      if (!logger) {
        return;
      }
      args.unshift(namespace);
      return logger[funcName](...args);
    }
  }
});

// node_modules/@opentelemetry/api/build/src/diag/types.js
var require_types = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagLogLevel = void 0;
    var DiagLogLevel;
    (function(DiagLogLevel2) {
      DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
      DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
      DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
      DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
      DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
      DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
      DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
    })(DiagLogLevel = exports2.DiagLogLevel || (exports2.DiagLogLevel = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js
var require_logLevelLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createLogLevelDiagLogger = void 0;
    var types_1 = require_types();
    function createLogLevelDiagLogger(maxLevel, logger) {
      if (maxLevel < types_1.DiagLogLevel.NONE) {
        maxLevel = types_1.DiagLogLevel.NONE;
      } else if (maxLevel > types_1.DiagLogLevel.ALL) {
        maxLevel = types_1.DiagLogLevel.ALL;
      }
      logger = logger || {};
      function _filterFunc(funcName, theLevel) {
        const theFunc = logger[funcName];
        if (typeof theFunc === "function" && maxLevel >= theLevel) {
          return theFunc.bind(logger);
        }
        return function() {
        };
      }
      return {
        error: _filterFunc("error", types_1.DiagLogLevel.ERROR),
        warn: _filterFunc("warn", types_1.DiagLogLevel.WARN),
        info: _filterFunc("info", types_1.DiagLogLevel.INFO),
        debug: _filterFunc("debug", types_1.DiagLogLevel.DEBUG),
        verbose: _filterFunc("verbose", types_1.DiagLogLevel.VERBOSE)
      };
    }
    exports2.createLogLevelDiagLogger = createLogLevelDiagLogger;
  }
});

// node_modules/@opentelemetry/api/build/src/api/diag.js
var require_diag = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/diag.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagAPI = void 0;
    var ComponentLogger_1 = require_ComponentLogger();
    var logLevelLogger_1 = require_logLevelLogger();
    var types_1 = require_types();
    var global_utils_1 = require_global_utils();
    var API_NAME = "diag";
    var DiagAPI = class _DiagAPI {
      /**
       * Private internal constructor
       * @private
       */
      constructor() {
        function _logProxy(funcName) {
          return function(...args) {
            const logger = (0, global_utils_1.getGlobal)("diag");
            if (!logger)
              return;
            return logger[funcName](...args);
          };
        }
        const self = this;
        const setLogger = (logger, optionsOrLogLevel = { logLevel: types_1.DiagLogLevel.INFO }) => {
          var _a, _b, _c;
          if (logger === self) {
            const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          const oldLogger = (0, global_utils_1.getGlobal)("diag");
          const newLogger = (0, logLevelLogger_1.createLogLevelDiagLogger)((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : types_1.DiagLogLevel.INFO, logger);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn(`Current logger will be overwritten from ${stack}`);
            newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
          }
          return (0, global_utils_1.registerGlobal)("diag", newLogger, self, true);
        };
        self.setLogger = setLogger;
        self.disable = () => {
          (0, global_utils_1.unregisterGlobal)(API_NAME, self);
        };
        self.createComponentLogger = (options) => {
          return new ComponentLogger_1.DiagComponentLogger(options);
        };
        self.verbose = _logProxy("verbose");
        self.debug = _logProxy("debug");
        self.info = _logProxy("info");
        self.warn = _logProxy("warn");
        self.error = _logProxy("error");
      }
      /** Get the singleton instance of the DiagAPI API */
      static instance() {
        if (!this._instance) {
          this._instance = new _DiagAPI();
        }
        return this._instance;
      }
    };
    exports2.DiagAPI = DiagAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js
var require_baggage_impl = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BaggageImpl = void 0;
    var BaggageImpl = class _BaggageImpl {
      constructor(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      getEntry(key) {
        const entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      }
      getAllEntries() {
        return Array.from(this._entries.entries()).map(([k, v]) => [k, v]);
      }
      setEntry(key, entry) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      }
      removeEntry(key) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      }
      removeEntries(...keys) {
        const newBaggage = new _BaggageImpl(this._entries);
        for (const key of keys) {
          newBaggage._entries.delete(key);
        }
        return newBaggage;
      }
      clear() {
        return new _BaggageImpl();
      }
    };
    exports2.BaggageImpl = BaggageImpl;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js
var require_symbol = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.baggageEntryMetadataSymbol = void 0;
    exports2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/utils.js
var require_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.baggageEntryMetadataFromString = exports2.createBaggage = void 0;
    var diag_1 = require_diag();
    var baggage_impl_1 = require_baggage_impl();
    var symbol_1 = require_symbol();
    var diag = diag_1.DiagAPI.instance();
    function createBaggage(entries = {}) {
      return new baggage_impl_1.BaggageImpl(new Map(Object.entries(entries)));
    }
    exports2.createBaggage = createBaggage;
    function baggageEntryMetadataFromString(str) {
      if (typeof str !== "string") {
        diag.error(`Cannot create baggage metadata from unknown type: ${typeof str}`);
        str = "";
      }
      return {
        __TYPE__: symbol_1.baggageEntryMetadataSymbol,
        toString() {
          return str;
        }
      };
    }
    exports2.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
  }
});

// node_modules/@opentelemetry/api/build/src/context/context.js
var require_context = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context/context.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ROOT_CONTEXT = exports2.createContextKey = void 0;
    function createContextKey(description) {
      return Symbol.for(description);
    }
    exports2.createContextKey = createContextKey;
    var BaseContext = class _BaseContext {
      /**
       * Construct a new context which inherits values from an optional parent context.
       *
       * @param parentContext a context from which to inherit values
       */
      constructor(parentContext) {
        const self = this;
        self._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self.getValue = (key) => self._currentContext.get(key);
        self.setValue = (key, value) => {
          const context = new _BaseContext(self._currentContext);
          context._currentContext.set(key, value);
          return context;
        };
        self.deleteValue = (key) => {
          const context = new _BaseContext(self._currentContext);
          context._currentContext.delete(key);
          return context;
        };
      }
    };
    exports2.ROOT_CONTEXT = new BaseContext();
  }
});

// node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js
var require_consoleLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiagConsoleLogger = void 0;
    var consoleMap = [
      { n: "error", c: "error" },
      { n: "warn", c: "warn" },
      { n: "info", c: "info" },
      { n: "debug", c: "debug" },
      { n: "verbose", c: "trace" }
    ];
    var DiagConsoleLogger = class {
      constructor() {
        function _consoleFunc(funcName) {
          return function(...args) {
            if (console) {
              let theFunc = console[funcName];
              if (typeof theFunc !== "function") {
                theFunc = console.log;
              }
              if (typeof theFunc === "function") {
                return theFunc.apply(console, args);
              }
            }
          };
        }
        for (let i = 0; i < consoleMap.length; i++) {
          this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
      }
    };
    exports2.DiagConsoleLogger = DiagConsoleLogger;
  }
});

// node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js
var require_NoopMeter = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createNoopMeter = exports2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = exports2.NOOP_OBSERVABLE_GAUGE_METRIC = exports2.NOOP_OBSERVABLE_COUNTER_METRIC = exports2.NOOP_UP_DOWN_COUNTER_METRIC = exports2.NOOP_HISTOGRAM_METRIC = exports2.NOOP_COUNTER_METRIC = exports2.NOOP_METER = exports2.NoopObservableUpDownCounterMetric = exports2.NoopObservableGaugeMetric = exports2.NoopObservableCounterMetric = exports2.NoopObservableMetric = exports2.NoopHistogramMetric = exports2.NoopUpDownCounterMetric = exports2.NoopCounterMetric = exports2.NoopMetric = exports2.NoopMeter = void 0;
    var NoopMeter = class {
      constructor() {
      }
      /**
       * @see {@link Meter.createHistogram}
       */
      createHistogram(_name, _options) {
        return exports2.NOOP_HISTOGRAM_METRIC;
      }
      /**
       * @see {@link Meter.createCounter}
       */
      createCounter(_name, _options) {
        return exports2.NOOP_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createUpDownCounter}
       */
      createUpDownCounter(_name, _options) {
        return exports2.NOOP_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableGauge}
       */
      createObservableGauge(_name, _options) {
        return exports2.NOOP_OBSERVABLE_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createObservableCounter}
       */
      createObservableCounter(_name, _options) {
        return exports2.NOOP_OBSERVABLE_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableUpDownCounter}
       */
      createObservableUpDownCounter(_name, _options) {
        return exports2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.addBatchObservableCallback}
       */
      addBatchObservableCallback(_callback, _observables) {
      }
      /**
       * @see {@link Meter.removeBatchObservableCallback}
       */
      removeBatchObservableCallback(_callback) {
      }
    };
    exports2.NoopMeter = NoopMeter;
    var NoopMetric = class {
    };
    exports2.NoopMetric = NoopMetric;
    var NoopCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    exports2.NoopCounterMetric = NoopCounterMetric;
    var NoopUpDownCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    exports2.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
    var NoopHistogramMetric = class extends NoopMetric {
      record(_value, _attributes) {
      }
    };
    exports2.NoopHistogramMetric = NoopHistogramMetric;
    var NoopObservableMetric = class {
      addCallback(_callback) {
      }
      removeCallback(_callback) {
      }
    };
    exports2.NoopObservableMetric = NoopObservableMetric;
    var NoopObservableCounterMetric = class extends NoopObservableMetric {
    };
    exports2.NoopObservableCounterMetric = NoopObservableCounterMetric;
    var NoopObservableGaugeMetric = class extends NoopObservableMetric {
    };
    exports2.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
    var NoopObservableUpDownCounterMetric = class extends NoopObservableMetric {
    };
    exports2.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
    exports2.NOOP_METER = new NoopMeter();
    exports2.NOOP_COUNTER_METRIC = new NoopCounterMetric();
    exports2.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
    exports2.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
    exports2.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
    exports2.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
    exports2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
    function createNoopMeter() {
      return exports2.NOOP_METER;
    }
    exports2.createNoopMeter = createNoopMeter;
  }
});

// node_modules/@opentelemetry/api/build/src/metrics/Metric.js
var require_Metric = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics/Metric.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValueType = void 0;
    var ValueType;
    (function(ValueType2) {
      ValueType2[ValueType2["INT"] = 0] = "INT";
      ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType = exports2.ValueType || (exports2.ValueType = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js
var require_TextMapPropagator = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultTextMapSetter = exports2.defaultTextMapGetter = void 0;
    exports2.defaultTextMapGetter = {
      get(carrier, key) {
        if (carrier == null) {
          return void 0;
        }
        return carrier[key];
      },
      keys(carrier) {
        if (carrier == null) {
          return [];
        }
        return Object.keys(carrier);
      }
    };
    exports2.defaultTextMapSetter = {
      set(carrier, key, value) {
        if (carrier == null) {
          return;
        }
        carrier[key] = value;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js
var require_NoopContextManager = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoopContextManager = void 0;
    var context_1 = require_context();
    var NoopContextManager = class {
      active() {
        return context_1.ROOT_CONTEXT;
      }
      with(_context, fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      bind(_context, target) {
        return target;
      }
      enable() {
        return this;
      }
      disable() {
        return this;
      }
    };
    exports2.NoopContextManager = NoopContextManager;
  }
});

// node_modules/@opentelemetry/api/build/src/api/context.js
var require_context2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/context.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ContextAPI = void 0;
    var NoopContextManager_1 = require_NoopContextManager();
    var global_utils_1 = require_global_utils();
    var diag_1 = require_diag();
    var API_NAME = "context";
    var NOOP_CONTEXT_MANAGER = new NoopContextManager_1.NoopContextManager();
    var ContextAPI = class _ContextAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Context API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _ContextAPI();
        }
        return this._instance;
      }
      /**
       * Set the current context manager.
       *
       * @returns true if the context manager was successfully registered, else false
       */
      setGlobalContextManager(contextManager) {
        return (0, global_utils_1.registerGlobal)(API_NAME, contextManager, diag_1.DiagAPI.instance());
      }
      /**
       * Get the currently active context
       */
      active() {
        return this._getContextManager().active();
      }
      /**
       * Execute a function with an active context
       *
       * @param context context to be active during function execution
       * @param fn function to execute in a context
       * @param thisArg optional receiver to be used for calling fn
       * @param args optional arguments forwarded to fn
       */
      with(context, fn, thisArg, ...args) {
        return this._getContextManager().with(context, fn, thisArg, ...args);
      }
      /**
       * Bind a context to a target function or event emitter
       *
       * @param context context to bind to the event emitter or function. Defaults to the currently active context
       * @param target function or event emitter to bind
       */
      bind(context, target) {
        return this._getContextManager().bind(context, target);
      }
      _getContextManager() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_CONTEXT_MANAGER;
      }
      /** Disable and remove the global context manager */
      disable() {
        this._getContextManager().disable();
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
    };
    exports2.ContextAPI = ContextAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/trace_flags.js
var require_trace_flags = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/trace_flags.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TraceFlags = void 0;
    var TraceFlags;
    (function(TraceFlags2) {
      TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
      TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags = exports2.TraceFlags || (exports2.TraceFlags = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js
var require_invalid_span_constants = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.INVALID_SPAN_CONTEXT = exports2.INVALID_TRACEID = exports2.INVALID_SPANID = void 0;
    var trace_flags_1 = require_trace_flags();
    exports2.INVALID_SPANID = "0000000000000000";
    exports2.INVALID_TRACEID = "00000000000000000000000000000000";
    exports2.INVALID_SPAN_CONTEXT = {
      traceId: exports2.INVALID_TRACEID,
      spanId: exports2.INVALID_SPANID,
      traceFlags: trace_flags_1.TraceFlags.NONE
    };
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js
var require_NonRecordingSpan = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NonRecordingSpan = void 0;
    var invalid_span_constants_1 = require_invalid_span_constants();
    var NonRecordingSpan = class {
      constructor(_spanContext = invalid_span_constants_1.INVALID_SPAN_CONTEXT) {
        this._spanContext = _spanContext;
      }
      // Returns a SpanContext.
      spanContext() {
        return this._spanContext;
      }
      // By default does nothing
      setAttribute(_key, _value) {
        return this;
      }
      // By default does nothing
      setAttributes(_attributes) {
        return this;
      }
      // By default does nothing
      addEvent(_name, _attributes) {
        return this;
      }
      // By default does nothing
      setStatus(_status) {
        return this;
      }
      // By default does nothing
      updateName(_name) {
        return this;
      }
      // By default does nothing
      end(_endTime) {
      }
      // isRecording always returns false for NonRecordingSpan.
      isRecording() {
        return false;
      }
      // By default does nothing
      recordException(_exception, _time) {
      }
    };
    exports2.NonRecordingSpan = NonRecordingSpan;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/context-utils.js
var require_context_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/context-utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSpanContext = exports2.setSpanContext = exports2.deleteSpan = exports2.setSpan = exports2.getActiveSpan = exports2.getSpan = void 0;
    var context_1 = require_context();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var context_2 = require_context2();
    var SPAN_KEY = (0, context_1.createContextKey)("OpenTelemetry Context Key SPAN");
    function getSpan(context) {
      return context.getValue(SPAN_KEY) || void 0;
    }
    exports2.getSpan = getSpan;
    function getActiveSpan() {
      return getSpan(context_2.ContextAPI.getInstance().active());
    }
    exports2.getActiveSpan = getActiveSpan;
    function setSpan(context, span) {
      return context.setValue(SPAN_KEY, span);
    }
    exports2.setSpan = setSpan;
    function deleteSpan(context) {
      return context.deleteValue(SPAN_KEY);
    }
    exports2.deleteSpan = deleteSpan;
    function setSpanContext(context, spanContext) {
      return setSpan(context, new NonRecordingSpan_1.NonRecordingSpan(spanContext));
    }
    exports2.setSpanContext = setSpanContext;
    function getSpanContext(context) {
      var _a;
      return (_a = getSpan(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
    }
    exports2.getSpanContext = getSpanContext;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js
var require_spancontext_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.wrapSpanContext = exports2.isSpanContextValid = exports2.isValidSpanId = exports2.isValidTraceId = void 0;
    var invalid_span_constants_1 = require_invalid_span_constants();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
    var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
    function isValidTraceId(traceId) {
      return VALID_TRACEID_REGEX.test(traceId) && traceId !== invalid_span_constants_1.INVALID_TRACEID;
    }
    exports2.isValidTraceId = isValidTraceId;
    function isValidSpanId(spanId) {
      return VALID_SPANID_REGEX.test(spanId) && spanId !== invalid_span_constants_1.INVALID_SPANID;
    }
    exports2.isValidSpanId = isValidSpanId;
    function isSpanContextValid(spanContext) {
      return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
    }
    exports2.isSpanContextValid = isSpanContextValid;
    function wrapSpanContext(spanContext) {
      return new NonRecordingSpan_1.NonRecordingSpan(spanContext);
    }
    exports2.wrapSpanContext = wrapSpanContext;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js
var require_NoopTracer = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoopTracer = void 0;
    var context_1 = require_context2();
    var context_utils_1 = require_context_utils();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var spancontext_utils_1 = require_spancontext_utils();
    var contextApi = context_1.ContextAPI.getInstance();
    var NoopTracer = class {
      // startSpan starts a noop span.
      startSpan(name, options, context = contextApi.active()) {
        const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
        const parentFromContext = context && (0, context_utils_1.getSpanContext)(context);
        if (isSpanContext(parentFromContext) && (0, spancontext_utils_1.isSpanContextValid)(parentFromContext)) {
          return new NonRecordingSpan_1.NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = (0, context_utils_1.setSpan)(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      }
    };
    exports2.NoopTracer = NoopTracer;
    function isSpanContext(spanContext) {
      return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
    }
  }
});

// node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js
var require_ProxyTracer = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProxyTracer = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var NOOP_TRACER = new NoopTracer_1.NoopTracer();
    var ProxyTracer = class {
      constructor(_provider, name, version, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version;
        this.options = options;
      }
      startSpan(name, options, context) {
        return this._getTracer().startSpan(name, options, context);
      }
      startActiveSpan(_name, _options, _context, _fn) {
        const tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      }
      /**
       * Try to get a tracer from the proxy tracer provider.
       * If the proxy tracer provider has no delegate, return a noop tracer.
       */
      _getTracer() {
        if (this._delegate) {
          return this._delegate;
        }
        const tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
          return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
      }
    };
    exports2.ProxyTracer = ProxyTracer;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js
var require_NoopTracerProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoopTracerProvider = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var NoopTracerProvider = class {
      getTracer(_name, _version, _options) {
        return new NoopTracer_1.NoopTracer();
      }
    };
    exports2.NoopTracerProvider = NoopTracerProvider;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js
var require_ProxyTracerProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProxyTracerProvider = void 0;
    var ProxyTracer_1 = require_ProxyTracer();
    var NoopTracerProvider_1 = require_NoopTracerProvider();
    var NOOP_TRACER_PROVIDER = new NoopTracerProvider_1.NoopTracerProvider();
    var ProxyTracerProvider = class {
      /**
       * Get a {@link ProxyTracer}
       */
      getTracer(name, version, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer_1.ProxyTracer(this, name, version, options);
      }
      getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
      }
      /**
       * Set the delegate tracer provider
       */
      setDelegate(delegate) {
        this._delegate = delegate;
      }
      getDelegateTracer(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
      }
    };
    exports2.ProxyTracerProvider = ProxyTracerProvider;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js
var require_SamplingResult = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SamplingDecision = void 0;
    var SamplingDecision;
    (function(SamplingDecision2) {
      SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
      SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision = exports2.SamplingDecision || (exports2.SamplingDecision = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/span_kind.js
var require_span_kind = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/span_kind.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SpanKind = void 0;
    var SpanKind;
    (function(SpanKind2) {
      SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
      SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
      SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
      SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
      SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind = exports2.SpanKind || (exports2.SpanKind = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/status.js
var require_status = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/status.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SpanStatusCode = void 0;
    var SpanStatusCode;
    (function(SpanStatusCode2) {
      SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
      SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
      SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
    })(SpanStatusCode = exports2.SpanStatusCode || (exports2.SpanStatusCode = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js
var require_tracestate_validators = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateValue = exports2.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
    var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
    var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
    var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
    function validateKey(key) {
      return VALID_KEY_REGEX.test(key);
    }
    exports2.validateKey = validateKey;
    function validateValue(value) {
      return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
    }
    exports2.validateValue = validateValue;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js
var require_tracestate_impl = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TraceStateImpl = void 0;
    var tracestate_validators_1 = require_tracestate_validators();
    var MAX_TRACE_STATE_ITEMS = 32;
    var MAX_TRACE_STATE_LEN = 512;
    var LIST_MEMBERS_SEPARATOR = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    var TraceStateImpl = class _TraceStateImpl {
      constructor(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if ((0, tracestate_validators_1.validateKey)(key) && (0, tracestate_validators_1.validateValue)(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new _TraceStateImpl();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
    exports2.TraceStateImpl = TraceStateImpl;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/internal/utils.js
var require_utils2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/internal/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createTraceState = void 0;
    var tracestate_impl_1 = require_tracestate_impl();
    function createTraceState(rawTraceState) {
      return new tracestate_impl_1.TraceStateImpl(rawTraceState);
    }
    exports2.createTraceState = createTraceState;
  }
});

// node_modules/@opentelemetry/api/build/src/context-api.js
var require_context_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context-api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.context = void 0;
    var context_1 = require_context2();
    exports2.context = context_1.ContextAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/diag-api.js
var require_diag_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag-api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.diag = void 0;
    var diag_1 = require_diag();
    exports2.diag = diag_1.DiagAPI.instance();
  }
});

// node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js
var require_NoopMeterProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NOOP_METER_PROVIDER = exports2.NoopMeterProvider = void 0;
    var NoopMeter_1 = require_NoopMeter();
    var NoopMeterProvider = class {
      getMeter(_name, _version, _options) {
        return NoopMeter_1.NOOP_METER;
      }
    };
    exports2.NoopMeterProvider = NoopMeterProvider;
    exports2.NOOP_METER_PROVIDER = new NoopMeterProvider();
  }
});

// node_modules/@opentelemetry/api/build/src/api/metrics.js
var require_metrics = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/metrics.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MetricsAPI = void 0;
    var NoopMeterProvider_1 = require_NoopMeterProvider();
    var global_utils_1 = require_global_utils();
    var diag_1 = require_diag();
    var API_NAME = "metrics";
    var MetricsAPI = class _MetricsAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Metrics API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _MetricsAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global meter provider.
       * Returns true if the meter provider was successfully registered, else false.
       */
      setGlobalMeterProvider(provider) {
        return (0, global_utils_1.registerGlobal)(API_NAME, provider, diag_1.DiagAPI.instance());
      }
      /**
       * Returns the global meter provider.
       */
      getMeterProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NoopMeterProvider_1.NOOP_METER_PROVIDER;
      }
      /**
       * Returns a meter from the global meter provider.
       */
      getMeter(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
      }
      /** Remove the global meter provider */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
    };
    exports2.MetricsAPI = MetricsAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/metrics-api.js
var require_metrics_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics-api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.metrics = void 0;
    var metrics_1 = require_metrics();
    exports2.metrics = metrics_1.MetricsAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js
var require_NoopTextMapPropagator = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoopTextMapPropagator = void 0;
    var NoopTextMapPropagator = class {
      /** Noop inject function does nothing */
      inject(_context, _carrier) {
      }
      /** Noop extract function does nothing and returns the input context */
      extract(context, _carrier) {
        return context;
      }
      fields() {
        return [];
      }
    };
    exports2.NoopTextMapPropagator = NoopTextMapPropagator;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js
var require_context_helpers = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.deleteBaggage = exports2.setBaggage = exports2.getActiveBaggage = exports2.getBaggage = void 0;
    var context_1 = require_context2();
    var context_2 = require_context();
    var BAGGAGE_KEY = (0, context_2.createContextKey)("OpenTelemetry Baggage Key");
    function getBaggage(context) {
      return context.getValue(BAGGAGE_KEY) || void 0;
    }
    exports2.getBaggage = getBaggage;
    function getActiveBaggage() {
      return getBaggage(context_1.ContextAPI.getInstance().active());
    }
    exports2.getActiveBaggage = getActiveBaggage;
    function setBaggage(context, baggage) {
      return context.setValue(BAGGAGE_KEY, baggage);
    }
    exports2.setBaggage = setBaggage;
    function deleteBaggage(context) {
      return context.deleteValue(BAGGAGE_KEY);
    }
    exports2.deleteBaggage = deleteBaggage;
  }
});

// node_modules/@opentelemetry/api/build/src/api/propagation.js
var require_propagation = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/propagation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PropagationAPI = void 0;
    var global_utils_1 = require_global_utils();
    var NoopTextMapPropagator_1 = require_NoopTextMapPropagator();
    var TextMapPropagator_1 = require_TextMapPropagator();
    var context_helpers_1 = require_context_helpers();
    var utils_1 = require_utils();
    var diag_1 = require_diag();
    var API_NAME = "propagation";
    var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator_1.NoopTextMapPropagator();
    var PropagationAPI = class _PropagationAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this.createBaggage = utils_1.createBaggage;
        this.getBaggage = context_helpers_1.getBaggage;
        this.getActiveBaggage = context_helpers_1.getActiveBaggage;
        this.setBaggage = context_helpers_1.setBaggage;
        this.deleteBaggage = context_helpers_1.deleteBaggage;
      }
      /** Get the singleton instance of the Propagator API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _PropagationAPI();
        }
        return this._instance;
      }
      /**
       * Set the current propagator.
       *
       * @returns true if the propagator was successfully registered, else false
       */
      setGlobalPropagator(propagator) {
        return (0, global_utils_1.registerGlobal)(API_NAME, propagator, diag_1.DiagAPI.instance());
      }
      /**
       * Inject context into a carrier to be propagated inter-process
       *
       * @param context Context carrying tracing data to inject
       * @param carrier carrier to inject context into
       * @param setter Function used to set values on the carrier
       */
      inject(context, carrier, setter = TextMapPropagator_1.defaultTextMapSetter) {
        return this._getGlobalPropagator().inject(context, carrier, setter);
      }
      /**
       * Extract context from a carrier
       *
       * @param context Context which the newly created context will inherit from
       * @param carrier Carrier to extract context from
       * @param getter Function used to extract keys from a carrier
       */
      extract(context, carrier, getter = TextMapPropagator_1.defaultTextMapGetter) {
        return this._getGlobalPropagator().extract(context, carrier, getter);
      }
      /**
       * Return a list of all fields which may be used by the propagator.
       */
      fields() {
        return this._getGlobalPropagator().fields();
      }
      /** Remove the global propagator */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
      _getGlobalPropagator() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_TEXT_MAP_PROPAGATOR;
      }
    };
    exports2.PropagationAPI = PropagationAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/propagation-api.js
var require_propagation_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation-api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.propagation = void 0;
    var propagation_1 = require_propagation();
    exports2.propagation = propagation_1.PropagationAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/api/trace.js
var require_trace = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/trace.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TraceAPI = void 0;
    var global_utils_1 = require_global_utils();
    var ProxyTracerProvider_1 = require_ProxyTracerProvider();
    var spancontext_utils_1 = require_spancontext_utils();
    var context_utils_1 = require_context_utils();
    var diag_1 = require_diag();
    var API_NAME = "trace";
    var TraceAPI = class _TraceAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
        this.wrapSpanContext = spancontext_utils_1.wrapSpanContext;
        this.isSpanContextValid = spancontext_utils_1.isSpanContextValid;
        this.deleteSpan = context_utils_1.deleteSpan;
        this.getSpan = context_utils_1.getSpan;
        this.getActiveSpan = context_utils_1.getActiveSpan;
        this.getSpanContext = context_utils_1.getSpanContext;
        this.setSpan = context_utils_1.setSpan;
        this.setSpanContext = context_utils_1.setSpanContext;
      }
      /** Get the singleton instance of the Trace API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _TraceAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global tracer.
       *
       * @returns true if the tracer provider was successfully registered, else false
       */
      setGlobalTracerProvider(provider) {
        const success = (0, global_utils_1.registerGlobal)(API_NAME, this._proxyTracerProvider, diag_1.DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
      }
      /**
       * Returns the global tracer provider.
       */
      getTracerProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || this._proxyTracerProvider;
      }
      /**
       * Returns a tracer from the global tracer provider.
       */
      getTracer(name, version) {
        return this.getTracerProvider().getTracer(name, version);
      }
      /** Remove the global tracer provider */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
      }
    };
    exports2.TraceAPI = TraceAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/trace-api.js
var require_trace_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace-api.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.trace = void 0;
    var trace_1 = require_trace();
    exports2.trace = trace_1.TraceAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/index.js
var require_src = __commonJS({
  "node_modules/@opentelemetry/api/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.trace = exports2.propagation = exports2.metrics = exports2.diag = exports2.context = exports2.INVALID_SPAN_CONTEXT = exports2.INVALID_TRACEID = exports2.INVALID_SPANID = exports2.isValidSpanId = exports2.isValidTraceId = exports2.isSpanContextValid = exports2.createTraceState = exports2.TraceFlags = exports2.SpanStatusCode = exports2.SpanKind = exports2.SamplingDecision = exports2.ProxyTracerProvider = exports2.ProxyTracer = exports2.defaultTextMapSetter = exports2.defaultTextMapGetter = exports2.ValueType = exports2.createNoopMeter = exports2.DiagLogLevel = exports2.DiagConsoleLogger = exports2.ROOT_CONTEXT = exports2.createContextKey = exports2.baggageEntryMetadataFromString = void 0;
    var utils_1 = require_utils();
    Object.defineProperty(exports2, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
      return utils_1.baggageEntryMetadataFromString;
    } });
    var context_1 = require_context();
    Object.defineProperty(exports2, "createContextKey", { enumerable: true, get: function() {
      return context_1.createContextKey;
    } });
    Object.defineProperty(exports2, "ROOT_CONTEXT", { enumerable: true, get: function() {
      return context_1.ROOT_CONTEXT;
    } });
    var consoleLogger_1 = require_consoleLogger();
    Object.defineProperty(exports2, "DiagConsoleLogger", { enumerable: true, get: function() {
      return consoleLogger_1.DiagConsoleLogger;
    } });
    var types_1 = require_types();
    Object.defineProperty(exports2, "DiagLogLevel", { enumerable: true, get: function() {
      return types_1.DiagLogLevel;
    } });
    var NoopMeter_1 = require_NoopMeter();
    Object.defineProperty(exports2, "createNoopMeter", { enumerable: true, get: function() {
      return NoopMeter_1.createNoopMeter;
    } });
    var Metric_1 = require_Metric();
    Object.defineProperty(exports2, "ValueType", { enumerable: true, get: function() {
      return Metric_1.ValueType;
    } });
    var TextMapPropagator_1 = require_TextMapPropagator();
    Object.defineProperty(exports2, "defaultTextMapGetter", { enumerable: true, get: function() {
      return TextMapPropagator_1.defaultTextMapGetter;
    } });
    Object.defineProperty(exports2, "defaultTextMapSetter", { enumerable: true, get: function() {
      return TextMapPropagator_1.defaultTextMapSetter;
    } });
    var ProxyTracer_1 = require_ProxyTracer();
    Object.defineProperty(exports2, "ProxyTracer", { enumerable: true, get: function() {
      return ProxyTracer_1.ProxyTracer;
    } });
    var ProxyTracerProvider_1 = require_ProxyTracerProvider();
    Object.defineProperty(exports2, "ProxyTracerProvider", { enumerable: true, get: function() {
      return ProxyTracerProvider_1.ProxyTracerProvider;
    } });
    var SamplingResult_1 = require_SamplingResult();
    Object.defineProperty(exports2, "SamplingDecision", { enumerable: true, get: function() {
      return SamplingResult_1.SamplingDecision;
    } });
    var span_kind_1 = require_span_kind();
    Object.defineProperty(exports2, "SpanKind", { enumerable: true, get: function() {
      return span_kind_1.SpanKind;
    } });
    var status_1 = require_status();
    Object.defineProperty(exports2, "SpanStatusCode", { enumerable: true, get: function() {
      return status_1.SpanStatusCode;
    } });
    var trace_flags_1 = require_trace_flags();
    Object.defineProperty(exports2, "TraceFlags", { enumerable: true, get: function() {
      return trace_flags_1.TraceFlags;
    } });
    var utils_2 = require_utils2();
    Object.defineProperty(exports2, "createTraceState", { enumerable: true, get: function() {
      return utils_2.createTraceState;
    } });
    var spancontext_utils_1 = require_spancontext_utils();
    Object.defineProperty(exports2, "isSpanContextValid", { enumerable: true, get: function() {
      return spancontext_utils_1.isSpanContextValid;
    } });
    Object.defineProperty(exports2, "isValidTraceId", { enumerable: true, get: function() {
      return spancontext_utils_1.isValidTraceId;
    } });
    Object.defineProperty(exports2, "isValidSpanId", { enumerable: true, get: function() {
      return spancontext_utils_1.isValidSpanId;
    } });
    var invalid_span_constants_1 = require_invalid_span_constants();
    Object.defineProperty(exports2, "INVALID_SPANID", { enumerable: true, get: function() {
      return invalid_span_constants_1.INVALID_SPANID;
    } });
    Object.defineProperty(exports2, "INVALID_TRACEID", { enumerable: true, get: function() {
      return invalid_span_constants_1.INVALID_TRACEID;
    } });
    Object.defineProperty(exports2, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
      return invalid_span_constants_1.INVALID_SPAN_CONTEXT;
    } });
    var context_api_1 = require_context_api();
    Object.defineProperty(exports2, "context", { enumerable: true, get: function() {
      return context_api_1.context;
    } });
    var diag_api_1 = require_diag_api();
    Object.defineProperty(exports2, "diag", { enumerable: true, get: function() {
      return diag_api_1.diag;
    } });
    var metrics_api_1 = require_metrics_api();
    Object.defineProperty(exports2, "metrics", { enumerable: true, get: function() {
      return metrics_api_1.metrics;
    } });
    var propagation_api_1 = require_propagation_api();
    Object.defineProperty(exports2, "propagation", { enumerable: true, get: function() {
      return propagation_api_1.propagation;
    } });
    var trace_api_1 = require_trace_api();
    Object.defineProperty(exports2, "trace", { enumerable: true, get: function() {
      return trace_api_1.trace;
    } });
    exports2.default = {
      context: context_api_1.context,
      diag: diag_api_1.diag,
      metrics: metrics_api_1.metrics,
      propagation: propagation_api_1.propagation,
      trace: trace_api_1.trace
    };
  }
});

// node_modules/fs-monkey/lib/util/lists.js
var require_lists = __commonJS({
  "node_modules/fs-monkey/lib/util/lists.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.fsSyncMethods = exports2.fsProps = exports2.fsAsyncMethods = void 0;
    var fsProps = ["constants", "F_OK", "R_OK", "W_OK", "X_OK", "Stats"];
    exports2.fsProps = fsProps;
    var fsSyncMethods = ["renameSync", "ftruncateSync", "truncateSync", "chownSync", "fchownSync", "lchownSync", "chmodSync", "fchmodSync", "lchmodSync", "statSync", "lstatSync", "fstatSync", "linkSync", "symlinkSync", "readlinkSync", "realpathSync", "unlinkSync", "rmdirSync", "mkdirSync", "mkdirpSync", "readdirSync", "closeSync", "openSync", "utimesSync", "futimesSync", "fsyncSync", "writeSync", "readSync", "readFileSync", "writeFileSync", "appendFileSync", "existsSync", "accessSync", "fdatasyncSync", "mkdtempSync", "copyFileSync", "rmSync", "createReadStream", "createWriteStream"];
    exports2.fsSyncMethods = fsSyncMethods;
    var fsAsyncMethods = ["rename", "ftruncate", "truncate", "chown", "fchown", "lchown", "chmod", "fchmod", "lchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "mkdirp", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile", "exists", "access", "fdatasync", "mkdtemp", "copyFile", "rm", "watchFile", "unwatchFile", "watch"];
    exports2.fsAsyncMethods = fsAsyncMethods;
  }
});

// node_modules/fs-monkey/lib/patchFs.js
var require_patchFs = __commonJS({
  "node_modules/fs-monkey/lib/patchFs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = patchFs2;
    var _lists = require_lists();
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it["return"] != null)
            it["return"]();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function patchFs2(vol) {
      var fs2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : require("fs");
      var bkp = {};
      var patch = function patch2(key, newValue) {
        bkp[key] = fs2[key];
        fs2[key] = newValue;
      };
      var patchMethod = function patchMethod2(key) {
        return patch(key, vol[key].bind(vol));
      };
      var _iterator = _createForOfIteratorHelper(_lists.fsProps), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var prop = _step.value;
          if (typeof vol[prop] !== "undefined")
            patch(prop, vol[prop]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (typeof vol.StatWatcher === "function") {
        patch("StatWatcher", vol.FSWatcher.bind(null, vol));
      }
      if (typeof vol.FSWatcher === "function") {
        patch("FSWatcher", vol.StatWatcher.bind(null, vol));
      }
      if (typeof vol.ReadStream === "function") {
        patch("ReadStream", vol.ReadStream.bind(null, vol));
      }
      if (typeof vol.WriteStream === "function") {
        patch("WriteStream", vol.WriteStream.bind(null, vol));
      }
      if (typeof vol._toUnixTimestamp === "function")
        patchMethod("_toUnixTimestamp");
      var _iterator2 = _createForOfIteratorHelper(_lists.fsAsyncMethods), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var method = _step2.value;
          if (typeof vol[method] === "function")
            patchMethod(method);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(_lists.fsSyncMethods), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _method = _step3.value;
          if (typeof vol[_method] === "function")
            patchMethod(_method);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return function unpatch() {
        for (var key in bkp)
          fs2[key] = bkp[key];
      };
    }
  }
});

// node_modules/fs-monkey/lib/correctPath.js
var require_correctPath = __commonJS({
  "node_modules/fs-monkey/lib/correctPath.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.correctPath = correctPath;
    exports2.unixify = unixify;
    var isWin = process.platform === "win32";
    function removeTrailingSeparator(str) {
      var i = str.length - 1;
      if (i < 2) {
        return str;
      }
      while (isSeparator(str, i)) {
        i--;
      }
      return str.substr(0, i + 1);
    }
    function isSeparator(str, i) {
      var _char = str[i];
      return i > 0 && (_char === "/" || isWin && _char === "\\");
    }
    function normalizePath(str, stripTrailing) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      str = str.replace(/[\\\/]+/g, "/");
      if (stripTrailing !== false) {
        str = removeTrailingSeparator(str);
      }
      return str;
    }
    function unixify(filepath) {
      var stripTrailing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (isWin) {
        filepath = normalizePath(filepath, stripTrailing);
        return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "");
      }
      return filepath;
    }
    function correctPath(filepath) {
      return unixify(filepath.replace(/^\\\\\?\\.:\\/, "\\"));
    }
  }
});

// node_modules/fs-monkey/lib/patchRequire.js
var require_patchRequire = __commonJS({
  "node_modules/fs-monkey/lib/patchRequire.js"(exports2) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2["default"] = patchRequire;
    var path = _interopRequireWildcard(require("path"));
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var isWin32 = process.platform === "win32";
    var correctPath = isWin32 ? require_correctPath().correctPath : function(p) {
      return p;
    };
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function patchRequire(vol) {
      var unixifyPaths = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var Module = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : require("module");
      if (isWin32 && unixifyPaths) {
        var original = vol;
        vol = {
          readFileSync: function readFileSync(path2, options) {
            return original.readFileSync(correctPath(path2), options);
          },
          realpathSync: function realpathSync(path2) {
            return original.realpathSync(correctPath(path2));
          },
          statSync: function statSync(path2) {
            return original.statSync(correctPath(path2));
          }
        };
      }
      function internalModuleReadFile(path2) {
        try {
          return vol.readFileSync(path2, "utf8");
        } catch (err) {
        }
      }
      function internalModuleStat(filename) {
        try {
          return vol.statSync(filename).isDirectory() ? 1 : 0;
        } catch (err) {
          return -2;
        }
      }
      function stat(filename) {
        filename = path._makeLong(filename);
        var cache = stat.cache;
        if (cache !== null) {
          var _result = cache.get(filename);
          if (_result !== void 0)
            return _result;
        }
        var result = internalModuleStat(filename);
        if (cache !== null)
          cache.set(filename, result);
        return result;
      }
      stat.cache = null;
      var preserveSymlinks = false;
      function toRealPath(requestPath) {
        return vol.realpathSync(requestPath);
      }
      var packageMainCache = /* @__PURE__ */ Object.create(null);
      function readPackage(requestPath) {
        var entry = packageMainCache[requestPath];
        if (entry)
          return entry;
        var jsonPath = path.resolve(requestPath, "package.json");
        var json = internalModuleReadFile(path._makeLong(jsonPath));
        if (json === void 0) {
          return false;
        }
        var pkg;
        try {
          var pkgJson = JSON.parse(json);
          pkg = packageMainCache[requestPath] = pkgJson.exports && pkgJson.exports.require || pkgJson.main;
        } catch (e) {
          e.path = jsonPath;
          e.message = "Error parsing " + jsonPath + ": " + e.message;
          throw e;
        }
        return pkg;
      }
      function tryFile(requestPath, isMain) {
        var rc = stat(requestPath);
        if (preserveSymlinks && !isMain) {
          return rc === 0 && path.resolve(requestPath);
        }
        return rc === 0 && toRealPath(requestPath);
      }
      function tryExtensions(p, exts, isMain) {
        for (var i = 0; i < exts.length; i++) {
          var filename = tryFile(p + exts[i], isMain);
          if (filename) {
            return filename;
          }
        }
        return false;
      }
      function tryPackage(requestPath, exts, isMain) {
        var pkg = readPackage(requestPath);
        if (!pkg)
          return false;
        var filename = path.resolve(requestPath, pkg);
        return tryFile(filename, isMain) || tryExtensions(filename, exts, isMain) || tryExtensions(path.resolve(filename, "index"), exts, isMain);
      }
      Module._extensions[".js"] = function(module3, filename) {
        var content = vol.readFileSync(filename, "utf8");
        module3._compile(stripBOM(content), filename);
      };
      Module._extensions[".json"] = function(module3, filename) {
        var content = vol.readFileSync(filename, "utf8");
        try {
          module3.exports = JSON.parse(stripBOM(content));
        } catch (err) {
          err.message = filename + ": " + err.message;
          throw err;
        }
      };
      var warned = true;
      Module._findPath = function(request, paths, isMain) {
        if (path.isAbsolute(request)) {
          paths = [""];
        } else if (!paths || paths.length === 0) {
          return false;
        }
        var cacheKey = request + "\0" + (paths.length === 1 ? paths[0] : paths.join("\0"));
        var entry = Module._pathCache[cacheKey];
        if (entry)
          return entry;
        var exts;
        var trailingSlash = request.length > 0 && request.charCodeAt(request.length - 1) === 47;
        for (var i = 0; i < paths.length; i++) {
          var curPath = paths[i];
          if (curPath && stat(curPath) < 1)
            continue;
          var basePath = correctPath(path.resolve(curPath, request));
          var filename;
          var rc = stat(basePath);
          if (!trailingSlash) {
            if (rc === 0) {
              if (preserveSymlinks && !isMain) {
                filename = path.resolve(basePath);
              } else {
                filename = toRealPath(basePath);
              }
            } else if (rc === 1) {
              if (exts === void 0)
                exts = Object.keys(Module._extensions);
              filename = tryPackage(basePath, exts, isMain);
            }
            if (!filename) {
              if (exts === void 0)
                exts = Object.keys(Module._extensions);
              filename = tryExtensions(basePath, exts, isMain);
            }
          }
          if (!filename && rc === 1) {
            if (exts === void 0)
              exts = Object.keys(Module._extensions);
            filename = tryPackage(basePath, exts, isMain);
          }
          if (!filename && rc === 1) {
            if (exts === void 0)
              exts = Object.keys(Module._extensions);
            filename = tryExtensions(path.resolve(basePath, "index"), exts, isMain);
          }
          if (filename) {
            if (request === "." && i > 0) {
              if (!warned) {
                warned = true;
                process.emitWarning("warning: require('.') resolved outside the package directory. This functionality is deprecated and will be removed soon.", "DeprecationWarning", "DEP0019");
              }
            }
            Module._pathCache[cacheKey] = filename;
            return filename;
          }
        }
        return false;
      };
    }
  }
});

// node_modules/fs-monkey/lib/index.js
var require_lib = __commonJS({
  "node_modules/fs-monkey/lib/index.js"(exports2) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "patchFs", {
      enumerable: true,
      get: function get() {
        return _patchFs["default"];
      }
    });
    Object.defineProperty(exports2, "patchRequire", {
      enumerable: true,
      get: function get() {
        return _patchRequire["default"];
      }
    });
    Object.defineProperty(exports2, "unixify", {
      enumerable: true,
      get: function get() {
        return _correctPath.unixify;
      }
    });
    exports2.util = void 0;
    var _patchFs = _interopRequireDefault(require_patchFs());
    var _patchRequire = _interopRequireDefault(require_patchRequire());
    var _correctPath = require_correctPath();
    var util = _interopRequireWildcard(require_lists());
    exports2.util = util;
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
  }
});

// src/shared/blobkey.ts
var blobkey_exports = {};
__export(blobkey_exports, {
  encodeBlobKey: () => encodeBlobKey
});
async function encodeBlobKey(key) {
  const buffer = import_node_buffer.Buffer.from(key);
  const base64 = buffer.toString("base64url");
  if (base64.length <= maxLength) {
    return base64;
  }
  const digest = await import_node_crypto.webcrypto.subtle.digest("SHA-256", buffer);
  const hash = import_node_buffer.Buffer.from(digest).toString("base64url");
  return `${base64.slice(0, maxLength - hash.length - 1)}-${hash}`;
}
var import_node_buffer, import_node_crypto, maxLength;
var init_blobkey = __esm({
  "src/shared/blobkey.ts"() {
    "use strict";
    import_node_buffer = require("node:buffer");
    import_node_crypto = require("node:crypto");
    maxLength = 180;
  }
});

// src/run/next.cts
var next_exports = {};
__export(next_exports, {
  getMockedRequestHandlers: () => getMockedRequestHandlers
});
module.exports = __toCommonJS(next_exports);
var import_promises = __toESM(require("fs/promises"));
var import_path = require("path");

// node_modules/@netlify/blobs/dist/main.js
var import_buffer = require("buffer");
var import_process = require("process");
var import_buffer2 = require("buffer");
var import_buffer3 = require("buffer");
var import_stream = __toESM(require("stream"), 1);
var import_util = require("util");
var BlobsConsistencyError = class extends Error {
  constructor() {
    super(
      `Netlify Blobs has failed to perform a read using strong consistency because the environment has not been configured with a 'uncachedEdgeURL' property`
    );
    this.name = "BlobsConsistencyError";
  }
};
var getEnvironmentContext = () => {
  const context = globalThis.netlifyBlobsContext || import_process.env.NETLIFY_BLOBS_CONTEXT;
  if (typeof context !== "string" || !context) {
    return {};
  }
  const data = import_buffer.Buffer.from(context, "base64").toString();
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
  const encodedObject = import_buffer2.Buffer.from(JSON.stringify(metadata)).toString("base64");
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
  const decodedData = import_buffer2.Buffer.from(encodedData, "base64").toString();
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
    if (import_buffer3.Buffer.byteLength(key, "utf8") > 600) {
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
    if (import_buffer3.Buffer.byteLength(name, "utf8") > 64) {
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
var pipeline = (0, import_util.promisify)(import_stream.default.pipeline);

// src/run/next.cts
var import_api = __toESM(require_src());
var import_fs_monkey = __toESM(require_lib());
var fetchBeforeNextPatchedIt = globalThis.fetch;
async function getMockedRequestHandlers(...args) {
  const tracer = import_api.trace.getTracer("Next.js Runtime");
  return tracer.startActiveSpan("mocked request handler", async (span) => {
    const store = getDeployStore({ fetch: fetchBeforeNextPatchedIt });
    const ofs = { ...import_promises.default };
    const { encodeBlobKey: encodeBlobKey2 } = await Promise.resolve().then(() => (init_blobkey(), blobkey_exports));
    async function readFileFallbackBlobStore(...fsargs) {
      const [path, options] = fsargs;
      try {
        return await ofs.readFile(path, options);
      } catch (error) {
        if (typeof path === "string" && path.endsWith(".html")) {
          const relPath = (0, import_path.relative)((0, import_path.resolve)(".next/server/pages"), path);
          const file = await store.get(await encodeBlobKey2(relPath));
          if (file !== null) {
            return file;
          }
        }
        throw error;
      }
    }
    (0, import_fs_monkey.patchFs)(
      {
        readFile: readFileFallbackBlobStore
      },
      // eslint-disable-next-line n/global-require, @typescript-eslint/no-var-requires
      require("fs").promises
    );
    const importSpan = tracer.startSpan("import next server");
    const { getRequestHandlers } = await import("next/dist/server/lib/start-server.js");
    importSpan.end();
    span.end();
    return getRequestHandlers(...args);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMockedRequestHandlers
});
