"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookcaseValidators = exports.authRequestValidators = void 0;
var _authSchema = require("./authSchema");
var _bookCaseSchema = require("./bookCaseSchema");
var createValidator = function createValidator(schema) {
  return function (payload) {
    return schema.validateAsync(payload);
  };
};

/**
 * Auth validator
 */

var loginValidator = createValidator(_authSchema.loginSchema);
var registerValidator = createValidator(_authSchema.registerSchema);
var changeUsernameValidator = createValidator(_authSchema.changeUsernameSchema);
var changePasswordValidator = createValidator(_authSchema.changePasswordSchema);
var authRequestValidators = {
  loginValidator: loginValidator,
  registerValidator: registerValidator,
  changeUsernameValidator: changeUsernameValidator,
  changePasswordValidator: changePasswordValidator
};

/**
 * Bookcase Validators
 */
exports.authRequestValidators = authRequestValidators;
var delBookcaseValidator = createValidator(_bookCaseSchema.delBookcaseSchema);
var addBookcaseValidator = createValidator(_bookCaseSchema.addBookcaseSchema);
var getBookcaseByIdValidator = createValidator(_bookCaseSchema.getBookcaseByIdSchema);
var bookcaseValidators = {
  delBookcaseValidator: delBookcaseValidator,
  addBookcaseValidator: addBookcaseValidator,
  getBookcaseByIdValidator: getBookcaseByIdValidator
};
exports.bookcaseValidators = bookcaseValidators;