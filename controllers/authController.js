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

// check if the user is logged in
exports.isLoggedIn = (req, res, next) => {
  if(req.user) {
    next();
    return;
  }
  req.flash("error", "You must login First!");
  res.redirect("/login");
};