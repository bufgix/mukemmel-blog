const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, unique: true, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  slug: {type: String, required: true}
});

module.exports = mongoose.model("Post", PostSchema);
