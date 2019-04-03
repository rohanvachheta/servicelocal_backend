var mongoose = require("mongoose");

var NewsSchema = mongoose.Schema({
  location: { type: String, required: true, minlength: 1 },

  service_provider: { type: mongoose.Schema.ObjectId, ref: "service" },

  show: { type: Boolean, required: true, default: true },

  created_at: { type: Date, required: true, default: Date.now },

  creator: { type: String, require: true, minlength: 1 },

  content: { type: String, required: true },

  photolink: { type: String, required: true },

  content_title: { type: String, required: true }
});

var news = mongoose.model("newsupload", NewsSchema);

module.exports = { news };
