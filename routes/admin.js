const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

const products = [];

router.get('/add-product', (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')) // 
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {pageTitle: 'Add product', path: '/admin/add-product'});
});

router.post('/add-product', (req, res) => {     // app.post
    console.log(req.body);      // {title: 'Book'}
    products.push({title: req.body.title});
    res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.products = products;
