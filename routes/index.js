const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
// import the error handlers
const { catchErrors } = require("../handlers/errorHandlers");

/*
*  All App's Routes
*/
// main route
router.get('/', catchErrors(storeController.getStores));
// get a list of the stores
router.get('/stores', catchErrors(storeController.getStores));
// for getting the addStore view
router.get('/add', storeController.addStore);
// for saving a new store
router.post('/add', catchErrors(storeController.saveStore));
// for editing a store
router.get("/stores/:id/edit", catchErrors(storeController.editStore));
// for updating a store
router.post("/add/:id", catchErrors(storeController.updateStore));

// export the router
module.exports = router;
