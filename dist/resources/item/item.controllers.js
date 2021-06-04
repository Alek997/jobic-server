"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _item = require("./item.model");

var _default = (0, _crud.crudControllers)(_item.Item);

exports.default = _default;