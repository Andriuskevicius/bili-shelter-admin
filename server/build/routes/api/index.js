"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _users = _interopRequireDefault(require("./users"));
var _animals = _interopRequireDefault(require("./animals"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.use('/users', _users.default);
router.use('/animals', _animals.default);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map