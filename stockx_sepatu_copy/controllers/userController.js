const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../middlewares/validate');

module.exports = {
  async createUser(req, res) {
    const { username, password, role, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword, role, name });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ 
        code: 404,
        message: 'User not found' 
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async updateUser(req, res) {
    const { username, password, role, name } = req.body;
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ 
        code: 404,
        message: 'User not found' 
      });

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      user.username = username || user.username;
      user.role = role || user.role;
      user.name = name || user.name;
      await user.save();

      res.json(user);
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ 
        code: 404,
        message: 'User not found' 
      });

      await user.destroy();
      res.status(200).json({
        code: 200,
        message: 'User data deleted' 
      });
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ 
          code: 401,
          message: 'Invalid credentials' 
        });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, 'secret', {
        expiresIn: '1h'
      });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ 
        code: 400,
        message: error.message 
      });
    }
  }
};
