"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slider = require("../../controllers/slider.controller");
var route = require('express').Router();
route.get('/', _slider.getAll);
var _default = route;
exports["default"] = _default;