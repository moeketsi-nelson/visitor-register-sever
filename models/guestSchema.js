const { model, Schema } = require("mongoose");

const guestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  cellno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: [true, "signature is required"],
  },
});

module.exports = guestSchema;
