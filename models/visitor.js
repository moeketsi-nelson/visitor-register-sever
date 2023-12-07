const { Schema, model } = require("mongoose");
const visitsSchema = require("./visitsSchema.js");

const visitorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    min: [2, "Name is too short"],
  },
  surname: {
    type: String,
    required: [true, "Please provide your surname"],
    min: [2, "Surname is too short"],
  },
  id: {
    type: String,
    required: [true, "Please provide your id"],
    min: [13, "Id length shorter than expected"],
    max: [13, "Id length longer than expected"],
  },
  cellno: {
    type: String,
    required: true,
    min: [12, "Cell-no length shorter than expected"],
    max: [12, "Cell-no length longer than expected"],
  },
  email: {
    type: String,
    required: true,
  },
  visits: [new Schema(
    {
      reason: {
        type: String,
        required: [true, "please set a reason for visit"],
      },
      date: {
        type: Date,
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
        required: [true, "Branch name is required"],
      },
      signature: {
        type: String,
        required: [true, "signature is required"]
      }
    }),
  ],
});

const Visitor = model("Visitor", visitorSchema);

module.exports = Visitor;
