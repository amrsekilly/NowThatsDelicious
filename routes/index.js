const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// import the error handlers
const { catchErrors } = require("../handlers/errorHandlers");

// Do work here
router.get('/',  catchErrors(storeController.getStores));
router.get('/stores',  catchErrors(storeController.getStores));
router.get('/add',  storeController.addStore);
// for saving a new store
router.post('/add',  catchErrors(storeController.saveStore));
// for editing a store
router.get("/stores/:id/edit", catchErrors(storeController.editStore));

router.get('/reverse/:name', (req, res) => {
  // reverse the name entered in the prameters
  let reversedName = [...req.params.name].reverse().join('');
  res.send(reversedName);
});

module.exports = router;
