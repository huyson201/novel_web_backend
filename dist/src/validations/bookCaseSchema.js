"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBookcaseByIdSchema = exports.delBookcaseSchema = exports.addBookcaseSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var delBookcaseSchema = _joi["default"].object({
  book_id: _joi["default"].number().required()
});
exports.delBookcaseSchema = delBookcaseSchema;
var addBookcaseSchema = _joi["default"].object({
  book_id: _joi["default"].number().required(),
  chapter_id: _joi["default"].number().required()
});
exports.addBookcaseSchema = addBookcaseSchema;
var getBookcaseByIdSchema = _joi["default"].object({
  book_id: _joi["default"].number().required()
});
exports.getBookcaseByIdSchema = getBookcaseByIdSchema;