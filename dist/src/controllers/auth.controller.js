"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../models"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _utils = require("../utils");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _int = _interopRequireDefault(require("../databases/int.redis"));
require("dotenv/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var getProfile = function getProfile(req, res) {
  return res.status(200).json((0, _utils.responseFormat)(_objectSpread(_objectSpread({}, req.user), {}, {
    password: undefined
  })));
};
var register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var data, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          data = req.body;
          _context.prev = 1;
          _context.next = 4;
          return _models["default"].user.create({
            data: data
          });
        case 4:
          user = _context.sent;
          return _context.abrupt("return", res.status(200).json((0, _utils.responseFormat)(_objectSpread(_objectSpread({}, user), {}, {
            password: undefined
          }))));
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          next((0, _httpErrors["default"])(500, _context.t0.message));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var _req$body, email, password, user, compare, _createToken, access_token, refresh_token, savedAge;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return _models["default"].user.findUnique({
            where: {
              email: email
            }
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", next((0, _httpErrors["default"])(401, 'Email / Password invalid')));
        case 7:
          compare = _bcrypt["default"].compareSync(password, user.password);
          if (compare) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", next((0, _httpErrors["default"])(401, 'Email / Password invalid')));
        case 10:
          _createToken = (0, _utils.createToken)({
            id: user.id,
            uid: user.uid,
            email: user.email
          }), access_token = _createToken.access_token, refresh_token = _createToken.refresh_token;
          savedAge = process.env.SAVED_TOKEN_TIME || 1000 * 60 * 60 * 24 * 365 * 20;
          res.cookie('auth.access_token', access_token, {
            httpOnly: true,
            maxAge: savedAge,
            secure: process.env.NODE_ENV === 'development' ? false : true
          });
          res.cookie('auth.refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: savedAge,
            secure: process.env.NODE_ENV === 'development' ? false : true
          });

          // add refresh token to redis
          _int["default"].set("user::".concat(user.id, "-").concat(user.uid), refresh_token, "EX", savedAge / 1000);
          return _context2.abrupt("return", res.status(200).json((0, _utils.responseFormat)(_objectSpread(_objectSpread({}, user), {}, {
            password: undefined
          }))));
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", next((0, _httpErrors["default"])(500, _context2.t0.message)));
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 18]]);
  }));
  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var logout = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _int["default"].del("user::".concat(req.user.id, "-").concat(req.user.uid));
          res.clearCookie('auth.access_token');
          res.clearCookie('auth.refresh_token');
          return _context3.abrupt("return", res.status(200).json((0, _utils.responseFormat)(null)));
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function logout(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var getBookcase = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var user, bookcase;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          user = req.user;
          _context4.prev = 1;
          _context4.next = 4;
          return _models["default"].bookCase.findMany({
            where: {
              userId: user.id
            },
            select: {
              book: {
                select: {
                  id: true,
                  image: true,
                  title: true,
                  slug: true
                }
              },
              chapter: {
                select: {
                  id: true,
                  title: true,
                  chapterNumber: true
                }
              }
            },
            orderBy: {
              updatedAt: "desc"
            }
          });
        case 4:
          bookcase = _context4.sent;
          return _context4.abrupt("return", res.status(200).json((0, _utils.responseFormat)(bookcase)));
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", next((0, _httpErrors["default"])(500, _context4.t0.message)));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function getBookcase(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteBookcaseById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var user, book_id, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          user = req.user;
          book_id = req.query.book_id;
          _context5.prev = 2;
          _context5.next = 5;
          return _models["default"].bookCase["delete"]({
            where: {
              userId_bookId: {
                userId: user.id,
                bookId: +book_id
              }
            }
          });
        case 5:
          data = _context5.sent;
          return _context5.abrupt("return", res.status(200).json((0, _utils.responseFormat)(data)));
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](2);
          return _context5.abrupt("return", next((0, _httpErrors["default"])(500, _context5.t0.message)));
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 9]]);
  }));
  return function deleteBookcaseById(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var addBookcase = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var user, _req$body2, book_id, chapter_id, bookcase;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user = req.user;
          _req$body2 = req.body, book_id = _req$body2.book_id, chapter_id = _req$body2.chapter_id;
          _context6.next = 5;
          return _models["default"].bookCase.upsert({
            where: {
              userId_bookId: {
                userId: user.id,
                bookId: +book_id
              }
            },
            update: {
              chapterId: +chapter_id
            },
            create: {
              userId: user.id,
              bookId: +book_id,
              chapterId: +chapter_id
            }
          });
        case 5:
          bookcase = _context6.sent;
          return _context6.abrupt("return", res.status(200).json((0, _utils.responseFormat)(bookcase)));
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", next((0, _httpErrors["default"])(500, _context6.t0.message)));
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function addBookcase(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var getBookcaseById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var user, book_id, bookcase;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user = req.user;
          book_id = req.params.book_id;
          _context7.next = 5;
          return _models["default"].bookCase.findFirst({
            where: {
              userId: user.id,
              bookId: +book_id
            }
          });
        case 5:
          bookcase = _context7.sent;
          return _context7.abrupt("return", res.status(200).json((0, _utils.responseFormat)(bookcase)));
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", next((0, _httpErrors["default"])(500, _context7.t0.message)));
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function getBookcaseById(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var refreshToken = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var refreshToken, verify, savedToken, _createToken2, access_token, refresh_token;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          refreshToken = req.cookies['auth.refresh_token'];
          _context8.prev = 1;
          verify = _jsonwebtoken["default"].verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          if (verify) {
            _context8.next = 5;
            break;
          }
          return _context8.abrupt("return", next((0, _httpErrors["default"])(401)));
        case 5:
          _context8.next = 7;
          return _int["default"].get("user::".concat(verify.id, "-").concat(verify.uid));
        case 7:
          savedToken = _context8.sent;
          if (!(!savedToken || savedToken != refreshToken)) {
            _context8.next = 10;
            break;
          }
          return _context8.abrupt("return", next((0, _httpErrors["default"])(401, "user do not login")));
        case 10:
          _createToken2 = (0, _utils.createToken)({
            id: verify.id,
            email: verify.email,
            uid: verify.uid
          }), access_token = _createToken2.access_token, refresh_token = _createToken2.refresh_token;
          _int["default"].set("user::".concat(verify.id, "-").concat(verify.uid), refresh_token, "EX", process.env.SAVED_TOKEN_TIME || 365 * 24 * 60 * 60);
          res.cookie('auth.access_token', access_token);
          res.cookie('auth.refresh_token', refresh_token);
          return _context8.abrupt("return", res.status(200).json({
            message: 'success'
          }));
        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](1);
          console.log(_context8.t0);
          return _context8.abrupt("return", next((0, _httpErrors["default"])(500, _context8.t0.message)));
        case 21:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 17]]);
  }));
  return function refreshToken(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
var updateUsername = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var currentUser, username, updatedUser;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          currentUser = req.user;
          username = req.body.username;
          if (!(!username || username === '')) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", next((0, _httpErrors["default"])(404, 'Username not found!')));
        case 4:
          _context9.prev = 4;
          _context9.next = 7;
          return _models["default"].user.update({
            where: {
              uid: currentUser.uid
            },
            data: {
              name: username
            }
          });
        case 7:
          updatedUser = _context9.sent;
          _int["default"].set("profile::".concat(updatedUser.id, "-").concat(updatedUser.uid), JSON.stringify(updatedUser), 'EX', 60 * 5 + (0, _utils.randomInt)(1, 10) * 10);
          return _context9.abrupt("return", res.status(200).json((0, _utils.responseFormat)(_objectSpread(_objectSpread({}, updatedUser), {}, {
            password: undefined
          }))));
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](4);
          console.log(_context9.t0);
          return _context9.abrupt("return", next((0, _httpErrors["default"])(500, _context9.t0.message)));
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[4, 12]]);
  }));
  return function updateUsername(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var changePasswd = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res, next) {
    var user, _req$body3, oldPassword, newPassword, confirmPassword, checkPassword, hashNewPassword, updatedUser;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          user = req.user;
          _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, confirmPassword = _req$body3.confirmPassword;
          if (!(newPassword !== confirmPassword)) {
            _context10.next = 4;
            break;
          }
          return _context10.abrupt("return", next((0, _httpErrors["default"])(401, "Confirm password not match!")));
        case 4:
          _context10.prev = 4;
          checkPassword = _bcrypt["default"].compare(oldPassword, user.password);
          if (checkPassword) {
            _context10.next = 8;
            break;
          }
          return _context10.abrupt("return", next((0, _httpErrors["default"])(401, "Password invalid")));
        case 8:
          hashNewPassword = _bcrypt["default"].hashSync(newPassword, _bcrypt["default"].genSaltSync(10));
          _context10.next = 11;
          return _models["default"].user.update({
            where: {
              uid: user.uid
            },
            data: {
              password: hashNewPassword
            }
          });
        case 11:
          updatedUser = _context10.sent;
          _int["default"].set("profile::".concat(updatedUser.id, "-").concat(updatedUser.uid), JSON.stringify(updatedUser), 'EX', 60 * 5 + (0, _utils.randomInt)(1, 10) * 10);
          return _context10.abrupt("return", res.status(200).json((0, _utils.responseFormat)({}, 200, "updated")));
        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](4);
          console.log(_context10.t0);
          return _context10.abrupt("return", next((0, _httpErrors["default"])(500, _context10.t0.message)));
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[4, 16]]);
  }));
  return function changePasswd(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var _default = {
  register: register,
  login: login,
  logout: logout,
  getBookcase: getBookcase,
  deleteBookcaseById: deleteBookcaseById,
  addBookcase: addBookcase,
  getBookcaseById: getBookcaseById,
  refreshToken: refreshToken,
  updateUsername: updateUsername,
  changePasswd: changePasswd,
  getProfile: getProfile
};
exports["default"] = _default;