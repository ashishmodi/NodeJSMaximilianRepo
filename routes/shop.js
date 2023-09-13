const express = require('express')
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');
const productsController = require('../controllers/products');

/*router.get('/', (req, res, next) => {      // app.use is an alternative
    // res.send("<h1>Hello from Express / !</h1>");
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));   // /views or ./views will not work, ../ to go level up. Also, .. still works, skip /
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const products = adminData.products;
    console.log(adminData.products);
    res.render('shop', {pageTitle: 'Shop', prods: products, path: '/'});   // use default templating engine
});*/
router.get('/', productsController.getProducts);

module.exports = router;