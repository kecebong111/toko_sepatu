module.exports = {
    user(req, res, next) {
      const { username, password, role } = req.body;
      if (!username || !password || !role) {
        return res.status(400).json({ 
          code: 400,
          message: 'Missing required fields' 
        });
      }
      if (role !== 'admin' && role !== 'user') {
        return res.status(400).json({ 
          code: 400,
          message: 'Invalid role' 
        });
      }
      next();
    },
  
    product(req, res, next) {
      const { name, description, price } = req.body;
      if (!name || !description || price === undefined) {
        return res.status(400).json({ 
          code: 400,
          message: 'Missing required fields' 
        });
      }
      if (price <= 0) {
        return res.status(400).json({ 
          code: 400,
          message: 'Price should be greater than 0' 
        });
      }
      next();
    },
  
    transaction(req, res, next) {
      const { userId, productId, quantity } = req.body;
      if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ 
          code: 400,
          message: 'Missing required fields'
        });
      }
      if (quantity <= 0) {
        return res.status(400).json({ 
          code: 400,
          message: 'Quantity should be greater than 0'
        });
      }
      next();
    }
  };
  