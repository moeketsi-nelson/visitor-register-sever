const { model, Schema } = require("mongoose");
const JWT = require("jsonwebtoken");
// const guestSchema = require("./guestSchema");

const eventSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  branch: {
    type: String,
    enum: [
      "Tshwane",
      "Johannesburg",
      "Gauteng Provincial Office",
      "Ekurhuleni",
      "Mamelodi",
      "Attredgeville",
      "Olievenhoutbosch",
      "Cullinan",
      "Bronkhorspruit",
      "Mabopane",
    ],
    required: [true, "branch is required"],
  },
  guests: [new Schema(
    {
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
    }),
  ],
});

eventSchema.methods.getSignedToken = function () {
  return JWT.sign(
    { name: this.name, branch: this.branch },
    process.env.JWT_SECRET2,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const Event = model("Event", eventSchema);
module.exports = Event;
