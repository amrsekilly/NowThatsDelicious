// require mongoose
const mongoose = require("mongoose");

exports.loginForm = (req, res) => {
  res.render("loginForm", {
    title: "Login"
  });
}