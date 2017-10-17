// homepage controller
exports.homepage = (req, res) => {
  res.render("index", {
    title: "Welcome to the food club!"
  });
};

exports.addStore = (req, res) => {
  res.render("editStore", {
    title: "Add Store"
  });
};
