const mongoose = require("mongoose");

const testmonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    disc: {
      type: String,
      required: true,
    },
     isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testmonial", testmonialSchema);