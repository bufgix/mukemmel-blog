const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TAGS = ["Git", "Python", "Javascript"];

const TagSchema = new Schema({
  name: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});

module.exports = mongoose.model("Tag", TagSchema);
