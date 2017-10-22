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
  tags: [String],
  created: {
    type: Date,
    default: Date.now()
  },
  // the location of the store
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [{
      type: Number,
      required: "You must supply coordinates for the store!"
    }],
    address: {
      type: String,
      required: "You must supply an address for the store!"
    }
  }
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
