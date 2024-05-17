maduramart
contoh ini sudah ada fitur validasi input dengan middleware, login dengan token, upload dan cart
--

1. buat folder maduramart sebagai folder untuk project
2. masuk ke folder maduramart dan jalankan: npm init -y
3. install modul2 yang di butuhkan
    npm install express sequelize mysql2 jsonwebtoken bcryptjs multer
    npm install --save-dev nodemon sequelize-cli

4. tambahkan pada package.json
    "scripts": {
      "start": "nodemon index.js",
    }

5. jalankan: npx sequelize-cli init
  untuk membuat koneksi ke db, model dan migration

6. check akan ada tambahan folder baru: config, migrations, models dan seeders

7. buat database maduramart di phpmyadmin
8. edit file config/config.js pada bagian development, sesuaikan user/pass dan dbname dengan mysql
9. test koneksi ke mysql menggunakan command: npx sequelize-cli db:migrate
  pastikan tidak ada error.

10. buat folder2 tambahan: controllers, routes, middlewares dan uploads
11. buat file index.js dengan kerangka sbb:
--
const express = require('express');

const { handle404, handle500 } = require('./middlewares/errorHandle');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(handle404);
app.use(handle500);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

12. buat errorHandle.js di folder middleware, ini untuk menghandle error 404 (not found) dan 500 (server error)
--
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


13. jalankan api dengan ketik "npm start" pada terminal, pastikan foldernya sudah sesuai dak tidak ada error

14. create models dan migration dengan command sbb:
    npx sequelize-cli model:generate --name User --attributes username:string,password:string,role:string,name:string
    npx sequelize-cli model:generate --name Product --attributes name:string,description:text,price:integer,stock:Integer,image:string
    npx sequelize-cli model:generate --name Cart --attributes userId:Integer,productId:Integer,quantity:integer
    npx sequelize-cli model:generate --name Order --attributes userId:Integer,productId:Integer,quantity:integer

15. edit file model pada folder models untuk mendefinisikan relasi Transaction ke table User dan Product
tambahkan di atas return User; return Product; dan return Transaction;

models/user.js
--
  User.associate = (models) => {
    User.hasMany(models.Cart, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

models/product.js
--
  Product.associate = (models) => {
    Product.hasMany(models.Cart, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Product.hasMany(models.Order, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

cart.js
--
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Cart.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

order.js
--
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Order.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };


15b. edit file create-cart dan create-order hapus pada bagian id:
    autoIncrement: true,
    primaryKey: true,

16. Jalankan command: npx sequelize-cli db:migrate 
    untuk membuat 4 table/model yang kita sebutkan di atas, User, Product, Cart dan Order

17. buat validate.js dan auth.js sesuai contekan dan taroh di folder middlewares

18. buat controller untuk user, product, cart dan order. contoh yang ada di folder controllers
19. buat route untuk user, product, cart dan order. contoh yang ada di folder routes

20. tambahkan route pada folder index.js sehingga hasil akhir dari index.js seperti file di bawah
--
const express = require('express');

const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute');
const checkoutRoutes = require('./routes/checkoutRoute');

const { handle404, handle500 } = require('./middlewares/errorHandle');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/checkout', checkoutRoutes);

app.use(handle404);
app.use(handle500);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
