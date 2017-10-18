// require mongoose
const mongoose = require("mongoose");

// get the Store model
const Store = mongoose.model("Store");

// homepage controller
exports.homepage = (req, res) => {
  res.render("index", {
    title: "Welcome to the food club!"
  });
};

// show the add store view
exports.addStore = (req, res) => {
  res.render("editStore", {
    title: "Add Store"
  });
};

// saves a store to the DB
exports.saveStore = async (req, res) => {

  // get the user's input and send it to the modal
  const store = Store(req.body);
  // save the user's input to the database
  await store.save();
};
