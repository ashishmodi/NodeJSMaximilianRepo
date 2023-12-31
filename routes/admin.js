const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

/*const products = [];
router.get('/add-product', (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')) // 
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {pageTitle: 'Add product', path: '/admin/add-product'});
});*/
router.get('/add-product', adminController.getAddProduct);

/*router.post('/add-product', (req, res) => {     // app.post
    console.log(req.body);      // {title: 'Book'}
    products.push({title: req.body.title});
    res.redirect('/');
});*/
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProducts);

module.exports = router;
// exports.routes = router;
// exports.products = products;
