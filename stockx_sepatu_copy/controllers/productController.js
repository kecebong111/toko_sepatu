const { Product } = require('../models');
const multer = require('multer');
const path = require('path');
const validate = require('../middlewares/validate');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = {
  upload,

  async createProduct(req, res) {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const product = await Product.create({ name, description, price, image });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async getProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ 
        code: 404,
        message: 'Product not found' 
      });
      res.json(product);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async updateProduct(req, res) {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ 
        code: 404,
        message: 'Product not found' 
      });

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.image = image || product.image;

      await product.save();
      res.json(product);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ 
        code: 404,
        message: 'Product not found' 
      });

      await product.destroy();
      res.status(200).json({
        code: 200,
        message: 'Product data deleted' 
      });
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  }
};
