const express = require('express');
const router = express.Router();

const StoreController = require('./../controllers/store.controller');

router.get('/:storeId', StoreController.getStore);
router.post('/', StoreController.addStore);
router.patch('/:storeId', StoreController.updateStore);
router.delete('/:storeId', StoreController.deleteStore);
router.get('/list/:userLinkedNumber', StoreController.getUserStores)

module.exports = router;
