// require mongoose
const mongoose = require("mongoose");

exports.loginForm = (req, res) => {
  res.render("loginForm", {
    title: "Login"
  });
};

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

};