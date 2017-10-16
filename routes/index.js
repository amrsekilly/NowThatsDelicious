const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const userInfo = {"Name": "Amr", "Age": 25, "title": "Web Developer"};
  // res.send('Hey! It works!');
  res.json(userInfo);
});

router.get('/reverse/:name', (req, res) => {
  // reverse the name entered in the prameters
  let reversedName = [...req.params.name].reverse().join('');
  res.send(reversedName);
});

module.exports = router;
