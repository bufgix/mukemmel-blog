const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const PostSchema = new Schema({
  title: String,
  details: String,
  slug: { type: String, slug: "title", unique: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String }
});

module.exports = mongoose.model("Post", PostSchema);
