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

  // get the user's input and send it to the modal and save it to the DB
  const store = await (Store(req.body)).save();

  // add a flash to the session to confirm that the store was added
  req.flash("success", `You've successfully added ${store.name} to the stores!`);

  // redirect user to the store page
  res.redirect(`/stores/${store.slug}`);
};
