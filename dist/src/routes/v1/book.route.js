"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _book = _interopRequireDefault(require("../../controllers/book.controller"));
var _chapter = require("../../controllers/chapter.controller");
var _common = require("../../middlewares/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = require('express').Router();
route.get('/', (0, _common.getAllsBookMiddleware)(), _book["default"].getBooks);
route.get('/recommends', _book["default"].getRecommends);
route.get('/popular', _book["default"].getPopularBooks);
route.get('/full', _book["default"].getFulledBooks);
route.get('/search', _book["default"].searchBook);
route.get('/:bookId/chapters', (0, _common.getChapterMiddleware)(), _chapter.getByBookId);
route.put('/:bookId/view/increase', _book["default"].incrementView);
route.get('/:bookId/chapters/search', (0, _common.getSearchChapterMiddleware)(), _chapter.getByBookId);
route.get('/slug/:slug', _book["default"].getBookBySlug);
route.get('/slug/:slug/chapter/:chapterId', _book["default"].getChapter);
var _default = route;
exports["default"] = _default;