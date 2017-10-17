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

storeSchema.pre("save", function(next) {

  // if the name is not modified, skip the slug generation step
  if (!this.isModified('name')) {
    next();
    return;
  }

  // generate a slug from the name of the store
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model("Store", storeSchema);
