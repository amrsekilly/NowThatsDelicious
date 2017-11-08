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
  photo: String,
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

storeSchema.pre("save", async function(next) {

  // if the name is not modified, skip the slug generation step
  if (!this.isModified('name')) {
    next();
    return;
  }

  // generate a slug from the name of the store
  this.slug = slug(this.name);

  // check if slug exists
  // regex for the slug matching 
  const regex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  // find the stores that has this slug already 
  const storesWithSlug = await this.constructor.find({ slug: regex});
  // if you have any matches
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }

  // continue saving the data to the DB
  next();
});

// aggrigate the stores by tags 
storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    {$unwind: "$tags"},
    { $group: { _id: "$tags", count: { $sum: 1}}},
    { $sort: { count: -1 }}
  ]);
};

module.exports = mongoose.model("Store", storeSchema);
