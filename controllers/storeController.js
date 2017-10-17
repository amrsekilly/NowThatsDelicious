exports.homepage = (req, res) => {
  const userInfo = {
    "Name": "Amr",
    "Age": 25,
    "title": "Web Developer"
  };
  // res.send('Hey! It works!');
  // res.json(userInfo);
  res.render("index", {
    title: "Welcome to the food club!"
  });
};
