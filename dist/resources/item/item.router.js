"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _item = _interopRequireDefault(require("./item.controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/item

router.route('/').get(_item.default.getOne).post(_item.default.createOne); // /api/item/:id

router.route('/:id').get(_item.default.getOne).put(_item.default.updateOne).delete(_item.default.removeOne);
var _default = router;
exports.default = _default;