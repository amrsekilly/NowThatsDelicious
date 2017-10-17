const mongoose = require("mongoose");
// assign mongoose promise the global promise for async wait functionality
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a valid name!"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

module.exports = mongoose.model("Store", storeSchema);
