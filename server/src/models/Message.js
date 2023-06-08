import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const animalSchema = new Schema(
  {
    chip_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

animalSchema.methods.toJSON = function () {
  return {
    id: this._id,
    chip_id: this.chip_id,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

export const validateMessage = (message) => {
  const schema = {
    name: Joi.string().min(3).max(300).required(),
    chip_id: Joi.string().min(12).max(12).required(),
  };
  return Joi.validate(message, schema);
};

const Message = mongoose.model('Message', animalSchema);

export default Message;
