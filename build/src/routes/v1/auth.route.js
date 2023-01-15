"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _auth = _interopRequireDefault(require("../../controllers/auth.controller"));
var _auth2 = _interopRequireDefault(require("../../middlewares/auth.middleware"));
var _common = require("../../middlewares/common");
var _validations = require("../../validations");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var route = require('express').Router();
route.post('/login', (0, _common.createValidateRequest)(_validations.authRequestValidators.loginValidator, 401), _auth["default"].login);
route.post('/register', (0, _common.createValidateRequest)(_validations.authRequestValidators.registerValidator, 401), _auth2["default"], _auth["default"].register);
route.post('/logout', _passport["default"].authenticate('jwt', {
  session: false
}), _auth["default"].logout);
route.post('/refresh-token', _auth["default"].refreshToken);
route.get('/me', _passport["default"].authenticate('jwt', {
  session: false
}), _auth["default"].getProfile);
route.post('/me/update/name', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _common.createValidateRequest)(_validations.authRequestValidators.changeUsernameValidator, "body", 400), _auth["default"].updateUsername);
route.post('/me/update/password', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _common.createValidateRequest)(_validations.authRequestValidators.changePasswordValidator, "body", 400), _auth["default"].changePasswd);

/**
 * Bookcase routes
 */
route.get('/me/bookcase', _passport["default"].authenticate('jwt', {
  session: false
}), _auth["default"].getBookcase);
route["delete"]('/me/bookcase/delete', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _common.createValidateRequest)(_validations.bookcaseValidators.delBookcaseValidator, "query", 400), _auth["default"].deleteBookcaseById);
route.post('/me/bookcase/add', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _common.createValidateRequest)(_validations.bookcaseValidators.addBookcaseValidator, "body", 400), _auth["default"].addBookcase);
route.get('/me/bookcase/find/:book_id', _passport["default"].authenticate('jwt', {
  session: false
}), (0, _common.createValidateRequest)(_validations.bookcaseValidators.getBookcaseByIdValidator, "params", 400), _auth["default"].getBookcaseById);
var _default = route;
exports["default"] = _default;