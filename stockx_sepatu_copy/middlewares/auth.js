const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  async verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ 
      code: 401,
      message: 'Unauthorized access' 
    });

    try {
      const decoded = jwt.verify(token, 'secret');
      req.user = await User.findByPk(decoded.id);
      next();
    } catch (error) {
      res.status(401).json({ 
        code: 401,
        message: 'Unauthorized access' 
      });
    }
  },

  isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        code: 403,
        message: 'Access Forbidden' 
      });
    }
    next();
  }
};
