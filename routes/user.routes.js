const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.get('/:email', UserController.getUser);
router.post('/', UserController.createUser);
router.patch('/', UserController.updateUser);
router.delete('/:email', UserController.deleteUser);

module.exports = router;