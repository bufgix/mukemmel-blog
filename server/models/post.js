const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  isDraft: {type: Boolean, default: false},
  slug: {type: String, slug: "title", unique: true}
});

module.exports = mongoose.model("Post", PostSchema);
