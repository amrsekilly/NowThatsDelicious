const mongoose = require("mongoose");
// assign mongoose promise the global promise for async wait functionality
mongoose.Promise = global.Promise;
// get the schema obj 
const Schema = mongoose.Schema;
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Enter a valid email address"],
    required: "Provide a valid email address"
  },
  name: {
    type: String,
    trim: true,
    required: "Supply your name please"
  }
});

// get the user's gravatar as a virtual field 
userSchema.virtual("gravatar").get(function() {
  // hash the user's email into an MD5 hash 
  const emailHash = md5(this.email);
  // return the gravatar to be displayed
  return `https://gravatar.com/avatar/${emailHash}?s=200`;
})

// plug in the passport plugin for the password authentication
userSchema.plugin(passportLocalMongoose, {usernameField: "email"});
userSchema.plugin(mongodbErrorHandler);

// export the user model
module.exports = mongoose.model("User", userSchema);