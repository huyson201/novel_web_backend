"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _int = _interopRequireDefault(require("../databases/int.redis"));
var _models = _interopRequireDefault(require("../models"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getBooks = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", res.status(200).json((0, _utils.responseFormat)(req.paginationResult)));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getBooks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getBookBySlug = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var slug, cache, book;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          slug = req.params.slug;
          _context2.next = 4;
          return _int["default"].get("book::".concat(slug));
        case 4:
          cache = _context2.sent;
          cache = (0, _utils.parseDataFromString)(cache);
          if (!cache) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(200).json((0, _utils.responseFormat)(cache)));
        case 8:
          _context2.next = 10;
          return _models["default"].book.findUnique({
            where: {
              slug: slug
            },
            include: {
              categories: true
            }
          });
        case 10:
          book = _context2.sent;
          _int["default"].set("book::".concat(slug), JSON.stringify(book), 'EX', 6 * 50);
          return _context2.abrupt("return", res.status(200).json((0, _utils.responseFormat)(book)));
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", next((0, _httpErrors["default"])(500, _context2.t0.message)));
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return function getBookBySlug(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getRecommends = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var cache, books;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _int["default"].get("recommends");
        case 3:
          cache = _context3.sent;
          cache = (0, _utils.parseDataFromString)(cache);
          if (!cache) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(200).json((0, _utils.responseFormat)(cache)));
        case 7:
          _context3.next = 9;
          return _models["default"].recommend.findMany({
            select: {
              book: {
                include: {
                  categories: true
                }
              }
            },
            orderBy: {
              updatedAt: 'desc'
            }
          });
        case 9:
          books = _context3.sent;
          books = books.map(function (value) {
            return value.book;
          });
          _int["default"].set("recommends", JSON.stringify(books), 'EX', 5 * 60);
          return _context3.abrupt("return", res.status(200).json((0, _utils.responseFormat)(books)));
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", next((0, _httpErrors["default"])(500, _context3.t0.message)));
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 15]]);
  }));
  return function getRecommends(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var getPopularBooks = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var limit, cache, books;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          limit = req.query.limit;
          if (!limit) limit = 10;
          _context4.prev = 2;
          _context4.next = 5;
          return _int["default"].get("popular::".concat(limit));
        case 5:
          cache = _context4.sent;
          cache = (0, _utils.parseDataFromString)(cache);
          if (!cache) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(200).json((0, _utils.responseFormat)(cache)));
        case 9:
          _context4.next = 11;
          return _models["default"].book.findMany({
            include: {
              categories: true
            },
            orderBy: {
              view: 'desc'
            },
            take: +limit
          });
        case 11:
          books = _context4.sent;
          _int["default"].set("popular::".concat(limit), JSON.stringify(books), 'EX', 6 * 50);
          return _context4.abrupt("return", res.status(200).json((0, _utils.responseFormat)(books)));
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](2);
          return _context4.abrupt("return", next((0, _httpErrors["default"])(500, _context4.t0.message)));
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 16]]);
  }));
  return function getPopularBooks(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var getFulledBooks = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var cache, books;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _int["default"].get("full-book");
        case 3:
          cache = _context5.sent;
          cache = (0, _utils.parseDataFromString)(cache);
          if (!cache) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(200).json((0, _utils.responseFormat)(cache)));
        case 7:
          _context5.next = 9;
          return _models["default"].book.findMany({
            where: {
              state: 'full'
            },
            include: {
              categories: true
            },
            orderBy: {
              updatedAt: 'desc'
            },
            take: 6
          });
        case 9:
          books = _context5.sent;
          _int["default"].set("full-book", JSON.stringify(books), 'EX', 6 * 50);
          return _context5.abrupt("return", res.status(200).json((0, _utils.responseFormat)(books)));
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", next((0, _httpErrors["default"])(500, _context5.t0.message)));
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function getFulledBooks(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
var getChapter = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var chapterId, cache, chapter, dataRes;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          chapterId = req.params.chapterId;
          _context6.prev = 1;
          _context6.next = 4;
          return _int["default"].get("chapter::".concat(chapterId));
        case 4:
          cache = _context6.sent;
          cache = (0, _utils.parseDataFromString)(cache);
          if (!cache) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(200).json((0, _utils.responseFormat)(cache)));
        case 8:
          _context6.next = 10;
          return _models["default"].chapter.findFirst({
            where: {
              id: +chapterId
            }
          });
        case 10:
          chapter = _context6.sent;
          _context6.next = 13;
          return (0, _utils.createChapterResponse)(chapter);
        case 13:
          dataRes = _context6.sent;
          _int["default"].set("chapter::".concat(chapterId), JSON.stringify(dataRes), 'EX', 6 * 50);
          return _context6.abrupt("return", res.status(200).json((0, _utils.responseFormat)(dataRes)));
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);
          return _context6.abrupt("return", next((0, _httpErrors["default"])(500, _context6.t0.message)));
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 18]]);
  }));
  return function getChapter(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
var searchBook = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var q, books;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          q = req.query.q;
          if (q) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", res.status(200).json((0, _utils.responseFormat)([])));
        case 3:
          _context7.prev = 3;
          _context7.next = 6;
          return _models["default"].book.findMany({
            where: {
              title: {
                search: q
              }
            },
            select: {
              id: true,
              slug: true,
              categories: true,
              image: true,
              title: true
            }
          });
        case 6:
          books = _context7.sent;
          return _context7.abrupt("return", res.status(200).json((0, _utils.responseFormat)(books)));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](3);
          console.log(_context7.t0);
          return _context7.abrupt("return", next((0, _httpErrors["default"])(500, _context7.t0.message)));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 10]]);
  }));
  return function searchBook(_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();
var incrementView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var userIp, bookId, key, isOk;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
          bookId = req.params.bookId;
          key = "".concat(userIp, "-").concat(bookId, "::views");
          console.log(userIp);
          console.log(bookId);
          _context8.prev = 5;
          _context8.next = 8;
          return _int["default"].set(key, 'viewed', 'NX', 'EX', 5 * 60);
        case 8:
          isOk = _context8.sent;
          if (!isOk) {
            _context8.next = 13;
            break;
          }
          console.log('increased view');
          _context8.next = 13;
          return _models["default"].book.update({
            where: {
              id: +bookId
            },
            data: {
              view: {
                increment: 1
              }
            }
          });
        case 13:
          return _context8.abrupt("return", res.status(200).json((0, _utils.responseFormat)(null, 200, "updated")));
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](5);
          console.log(_context8.t0);
          return _context8.abrupt("return", next((0, _httpErrors["default"])(500, _context8.t0.message)));
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[5, 16]]);
  }));
  return function incrementView(_x21, _x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();
var _default = {
  getBooks: getBooks,
  getBookBySlug: getBookBySlug,
  getRecommends: getRecommends,
  getPopularBooks: getPopularBooks,
  getFulledBooks: getFulledBooks,
  getChapter: getChapter,
  searchBook: searchBook,
  incrementView: incrementView
};
exports["default"] = _default;