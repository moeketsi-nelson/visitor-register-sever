const { model, Schema } = require("mongoose");

const visitsSchema = new Schema({
  reason: {
    type: String,
    required: [true, "please set a reason for visit"],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});


module.exports = { visitsSchema };
