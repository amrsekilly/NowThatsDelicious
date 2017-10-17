const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
router.get('/',  storeController.homepage);
router.get('/add',  storeController.addStore);
// for saving a new store
router.post('/add',  storeController.saveStore);

router.get('/reverse/:name', (req, res) => {
  // reverse the name entered in the prameters
  let reversedName = [...req.params.name].reverse().join('');
  res.send(reversedName);
});

module.exports = router;
