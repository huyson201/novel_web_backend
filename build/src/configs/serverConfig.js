"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _passport = _interopRequireDefault(require("passport"));
require("./passport");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var hostList = process.env.OPEN_COR_HOST ? process.env.OPEN_COR_HOST.split('|') : 'http://localhost:3000';
var serverConfig = function serverConfig(app) {
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: false
  }));
  app.use((0, _cors["default"])({
    origin: hostList,
    credentials: true
  }));
  app.use((0, _morgan["default"])('dev'));
  app.use((0, _cookieParser["default"])());
  app.use(_passport["default"].initialize());
};
module.exports = serverConfig;