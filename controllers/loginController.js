// require mongoose
const mongoose = require("mongoose");
// import the promisify package
const promisify = require("es6-promisify");
// get the user model
const User = mongoose.model("User");

// show the login form
exports.loginForm = (req, res) => {
  res.render("loginForm", {
    title: "Login"
  });
};
// show the sign up form
exports.registerForm = (req, res) => {
  res.render("registerForm", {
  title: "Register"
});
};

// register info validation 
exports.validateRegister = (req, res, next) => {
  // make sure that the name doesn't contain any malicious scripts
  req.sanitizeBody("name");
  // make sure that the name is not empty
  req.checkBody("name", "Please supply a valid name").notEmpty();
  // check for a valid email address 
  req.checkBody("email", "Please supply a valid email").isEmail();
  req.checkBody("confirm-email", "Please supply a valid email").isEmail();
  req.checkBody("confirm-email", "Your emails don't match").equals(req.body.email);
  // normalize the email 
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  // make sure that the password is not empty 
  req.checkBody("password", "Please supply a valid password").notEmpty();
  req.checkBody("confirm-password", "Please supply a valid password").notEmpty();
  req.checkBody("confirm-password", "Your passwords don't match").equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash("error", errors.map(error => error.msg));
    res.render("registerForm", {
      title: "Register",
      body: req.body,
      flashes: req.flash()
    });
  }
  next();
};

// register middleware to store the user info to the DB 
exports.register = async (req, res, next) => {
  const userData = new User({
    email: req.body.email, 
    name: req.body.name
  });
  // to store the password we need to use passport
  // turn the callback-based method into a promise method using promisify
  const register = promisify(User.register, User);
  // await this register method to do the registering to the DB
  await register(userData, req.body.password);
  // move to the next middleware to login the user 
  res.send("User Registered Successfully");
  // next();
};
