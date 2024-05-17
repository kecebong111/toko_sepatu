// Middleware for 404 error
const handle404 = (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: 'Resource not found'
  });
};

// Middleware for handling 500 errors
const handle500 = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    message: 'Internal server error'
  });
};

module.exports = {
  handle404,
  handle500
};
