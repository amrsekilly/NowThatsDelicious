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
})
};