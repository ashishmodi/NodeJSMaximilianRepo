//const products = [];  // use model
const Product = require('../models/product')
// code moved to new admin controller

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products => {
        res.render('shop/index', {pageTitle: 'Shop', prods: products, path: '/'});
    }));
}

exports.getProducts = (req, res) => {
    // const products = Product.fetchAll();
    // res.render('shop', {pageTitle: 'Shop', prods: products, path: '/'});
    Product.fetchAll((products => {
        res.render('shop/product-list', {pageTitle: 'All products', prods: products, path: '/products'});
    }));
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { pageTitle: 'Your Cart', path: '/cart' });
};

exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: 'Your Orders', path: '/orders' });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
}