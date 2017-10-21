// require mongoose
const mongoose = require("mongoose");

// get the Store model
const Store = mongoose.model("Store");

// homepage controller
exports.homepage = (req, res) => {
  res.render("index", {
    title: "Welcome to the food club!",
    username: "Amr"
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
  res.redirect(`/store/${store.slug}`);
};

// retrieve the stores from the DB
exports.getStores = async (req, res) => {
  // query the DB for stores
  const stores = await Store.find();

  // console log the stores
  // console.log(stores);

  // render the template
  res.render("stores", {
    title: "Stores",
    stores
  });
};

// edit store controller
exports.editStore = async (req, res) => {
  // get the selected store
  const store = await Store.findOne({_id: req.params.id});
  res.render("editStore", {
    title: `Edit ${store.name}`,
    store
  });
};

exports.updateStore = async (req, res) => {
  // update the store with the new data
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    // to make sure that the user didn't violate the mongoose schema
    runValidators: true
  }).exec();

  // confirm the edit
  req.flash("success", `You've successfully edited ${store.name}! View it <a href="/stores/${store.slug}">here</a>`);
  // redirect the user to the stores page
  res.redirect("/stores");
};
