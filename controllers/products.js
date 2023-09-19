//const products = [];  // use model
const Product = require('../models/product')
exports.getAddProduct = (req, res) => {
    res.render('add-product', {pageTitle: 'Add product', path: '/admin/add-product'});
};

exports.postAddProduct = (req, res) => {
    // products.push({title: req.body.title});
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    // const products = Product.fetchAll();
    // res.render('shop', {pageTitle: 'Shop', prods: products, path: '/'});
    Product.fetchAll((products => {
        res.render('shop', {pageTitle: 'Shop', prods: products, path: '/'});
    }));
};