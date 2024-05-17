const express = require('express');
const transactionController = require('../controllers/transactionController');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth.verifyToken, validate.transaction, transactionController.createTransaction);
router.get('/', auth.verifyToken, transactionController.getAllTransactions);
router.get('/:id', auth.verifyToken, transactionController.getTransaction);
router.put('/:id', auth.verifyToken, validate.transaction, transactionController.updateTransaction);
router.delete('/:id', auth.verifyToken, auth.isAdmin, transactionController.deleteTransaction);

module.exports = router;
