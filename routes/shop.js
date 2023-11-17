const express = require('express')
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');
const shopController = require('../controllers/shop');

/*router.get('/', (req, res, next) => {      // app.use is an alternative
    // res.send("<h1>Hello from Express / !</h1>");
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));   // /views or ./views will not work, ../ to go level up. Also, .. still works, skip /
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const products = adminData.products;
    console.log(adminData.products);
    res.render('shop', {pageTitle: 'Shop', prods: products, path: '/'});   // use default templating engine
});*/
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/cart', shopController.postCart)
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

module.exports = router;