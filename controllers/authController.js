// import passport
const passport = require("passport");

// the login controller
exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed to login",
  successRedirect: "/",
  successFlash: "You're now logged in!"
});