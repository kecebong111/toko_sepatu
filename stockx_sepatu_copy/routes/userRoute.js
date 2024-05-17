const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', auth.verifyToken, userController.getAllUsers);
router.get('/:id', auth.verifyToken, userController.getUser);
router.put('/:id', auth.verifyToken, validate.user, userController.updateUser);
router.delete('/:id', auth.verifyToken, auth.isAdmin, userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;
