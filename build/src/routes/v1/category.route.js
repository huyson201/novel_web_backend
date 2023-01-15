"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _category = require("../../controllers/category.controller");
var _common = require("../../middlewares/common");
var route = require('express').Router();
route.get('/', _category.getAll);
route.get('/:cateSlug/books', (0, _common.getBooksByCateMiddleware)(), _category.getBooksByCate);
var _default = route;
exports["default"] = _default;