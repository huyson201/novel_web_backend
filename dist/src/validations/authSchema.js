"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = exports.loginSchema = exports.changeUsernameSchema = exports.changePasswordSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var loginSchema = _joi["default"].object({
  email: _joi["default"].string().email().required(),
  password: _joi["default"].string().min(6).required()
});
exports.loginSchema = loginSchema;
var registerSchema = _joi["default"].object({
  name: _joi["default"].string().required(),
  email: _joi["default"].string().email().required(),
  password: _joi["default"].string().min(3).required()
});
exports.registerSchema = registerSchema;
var changeUsernameSchema = _joi["default"].object({
  username: _joi["default"].string().required()
});
exports.changeUsernameSchema = changeUsernameSchema;
var changePasswordSchema = _joi["default"].object({
  oldPassword: _joi["default"].string().min(3).required(),
  newPassword: _joi["default"].string().min(3).required(),
  confirmPassword: _joi["default"].string().min(3).valid(_joi["default"].ref("newPassword")).required().optional({
    language: {
      any: {
        allowOnly: 'must match new password'
      }
    }
  })
});
exports.changePasswordSchema = changePasswordSchema;