// import passport
const passport = require("passport");

// the login controller
exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed to login",
  successRedirect: "/",
  successFlash: "You're now logged in!"
});

// logout middleware
exports.logout = (req, res) => {
  // do the logout
  req.logout();
  // show a flash to the user
  req.flash("success", "We hope to see you soon! ❤️");
  // redirect them back to the homepage
  res.redirect("/");
}