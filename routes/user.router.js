const express = require('express');
const router = express.Router();
//const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;