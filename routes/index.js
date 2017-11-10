const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const loginController = require('../controllers/loginController');
// import the error handlers
const { catchErrors } = require("../handlers/errorHandlers");

/*
*  All App's Routes
*/
// main route
router.get('/', catchErrors(storeController.getStores));
// get a list of the stores
router.get('/stores', catchErrors(storeController.getStores));
// for login 
router.get("/login", loginController.loginForm); 
// for register 
router.get("/register", loginController.registerForm); 
// post the validation data to the server 
router.post("/register",
loginController.validateRegister,
loginController.register);
// for getting the addStore view
router.get('/add', storeController.addStore);
// get store by slug 
router.get("/store/:slug", catchErrors(storeController.getStoreBySlug));
// get the stores by tags 
router.get("/tags/", catchErrors(storeController.getStoresByTag));
// get the stores for a certain tag
router.get("/tags/:tag", catchErrors(storeController.getStoresByTag));
// for saving a new store
router.post('/add',
storeController.uploadImage,
catchErrors(storeController.resize),
catchErrors(storeController.saveStore)
);
// for editing a store
router.get("/stores/:id/edit", catchErrors(storeController.editStore));
// for updating a store
router.post("/add/:id", 
storeController.uploadImage,
catchErrors(storeController.resize),
catchErrors(storeController.updateStore));

// export the router
module.exports = router;
