const express = require('express');
const router = express.Router();

const StorefrontController = require('../controllers/storefront.controller');
const StoreController = require('./../controllers/store.controller');

router.get('/inventory', StorefrontController.getInventory);
router.post('/inventory', StorefrontController.addInventory);
router.patch('/inventory/:skuId', StorefrontController.updateInventory);
router.delete('/inventory/:skuId', StorefrontController.deleteInventory);
router.get('/stores/:storePincode', StoreController.getAllStores);

module.exports = router;