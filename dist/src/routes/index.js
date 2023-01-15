"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _v = _interopRequireDefault(require("./v1"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = function routes(app) {
  app.use('/api/v1', _v["default"]);
};
var _default = routes;
exports["default"] = _default;