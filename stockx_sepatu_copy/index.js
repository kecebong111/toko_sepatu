const express = require('express');

const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const transactionRoutes = require('./routes/transactionRoute');
const { handle404, handle500 } = require('./middlewares/errorHandle');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/transactions', transactionRoutes);

app.use(handle404);
app.use(handle500);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});