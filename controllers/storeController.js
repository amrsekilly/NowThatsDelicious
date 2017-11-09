// require mongoose
const mongoose = require("mongoose");
// get the Store model
const Store = mongoose.model("Store");
// require multer for multipart data in the form
const multer = require("multer");
// require jimp for image resizing
const Jimp = require("jimp");
/*
* require uuid for generating a 
* unique ID for each image before storing it.
* I'll use Version 4 for best randomness
*/
const uuid = require("uuid");

// multer options
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    // make sure that the MIME filetype indecates an image
    const suppportedFileType = file.mimetype.startsWith("image/");
    // if it's an image, move on to the next middleware
    if (suppportedFileType) {
      // Accept file -- no error to the callback
      cb(null, true);
    }
    else {
      // Reject file -- return an error message
      cb({message: "Please enter a valid image"}, false);
    }
  }
};

/* 
* The upload image middleware 
* with a fieldname of photo to match the input name
*/
exports.uploadImage = multer(multerOptions).single("photo");

// Image Resizing Middleware
exports.resize = async (req, res, next) => {
  // if no file is uploaded skip to the next middleware
  if(!req.file) {
    next();
    // make sure to exit the middleware
    return;
  }

  // if there's a file, do the resizing and saving
  // get the extension from the mimetype
  const imgExtension = req.file.mimetype.split("/")[1];
  // rename the image stored in buffer and append it to the req.body
  req.body.photo = `${uuid.v4()}.${imgExtension}`;
  // get the image from the buffer into Jimp
  const image = await Jimp.read(req.file.buffer);
  // resize the image
  await image.resize(800, Jimp.AUTO);
  // Save the resized image to the disc 
  await image.write(`./public/uploads/${req.body.photo}`);
  // move to the next middleware
  next();
};

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

  // make sure that the updated store has an address of type point
  req.body.location.type = "Point";
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


// controller to get stores by slug 
exports.getStoreBySlug = async (req, res, next) => {
  // get the store
  const store = await Store.findOne({ slug: req.params.slug });
  // if the store is not found render the 404
  if(!store) return next();
  // else render the store view
  res.render("storeView", {
    title: `${store.name}`,
    store
  });
}


// get stores by tag
exports.getStoresByTag = async (req, res) => {
  // aggregate the stores with tags
  const tags = await Store.getTagsList();
  // return the result to the user 
  res.render("tags", {
    title: "tags",
    tags
  });
}
