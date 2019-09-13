const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    details: { type: String, required: true },
    tags: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", schema);
