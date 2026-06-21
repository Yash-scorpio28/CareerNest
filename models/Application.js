const mongoose = require("mongoose");

const ApplicationSchema =
  new mongoose.Schema({
    candidate: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    job: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    status: {
      type: String,
      default: "pending",
    },
  });

module.exports = mongoose.model(
  "Application",
  ApplicationSchema
);