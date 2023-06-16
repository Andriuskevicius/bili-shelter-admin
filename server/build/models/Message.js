"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMessage = exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const animalSchema = new Schema({
  chip_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
animalSchema.methods.toJSON = function () {
  return {
    id: this._id,
    chip_id: this.chip_id,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON()
  };
};
const validateMessage = message => {
  const schema = {
    name: _joi.default.string().min(3).max(300).required(),
    chip_id: _joi.default.string().min(12).max(12).required()
  };
  return _joi.default.validate(message, schema);
};
exports.validateMessage = validateMessage;
const Message = _mongoose.default.model('Message', animalSchema);
var _default = Message;
exports.default = _default;
//# sourceMappingURL=Message.js.map