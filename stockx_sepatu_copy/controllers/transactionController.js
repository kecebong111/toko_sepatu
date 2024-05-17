const { Transaction, User, Product } = require('../models');
const validate = require('../middlewares/validate');

module.exports = {
  async createTransaction(req, res) {
    const { userId, productId, quantity } = req.body;
    try {
      const transaction = await Transaction.create({ userId, productId, quantity });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll({ include: [User, Product] });
      res.json(transactions);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async getTransaction(req, res) {
    try {
      const transaction = await Transaction.findByPk(req.params.id, {
        include: [User, Product]
      });
      if (!transaction) return res.status(404).json({ 
        code: 404,
        message: 'Transaction not found' 
      });
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async updateTransaction(req, res) {
    const { userId, productId, quantity } = req.body;

    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if (!transaction) return res.status(404).json({ 
        code: 404,
        message: 'Transaction not found' 
      });

      transaction.userId = userId || transaction.userId;
      transaction.productId = productId || transaction.productId;
      transaction.quantity = quantity || transaction.quantity;
      await transaction.save();

      res.json(transaction);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async deleteTransaction(req, res) {
    try {
      const transaction = await Transaction.findByPk(req.params.id);
      if (!transaction) return res.status(404).json({ 
        code: 404,
        message: 'Transaction not found' 
      });

      await transaction.destroy();
      res.status(200).json({
        code: 200,
        message: 'Transaction data deleted' 
      });
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  }
};
