const Product = require('../models/product')
exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {pageTitle: 'Add product', path: '/admin/add-product'});
};

exports.postAddProduct = (req, res) => {
    // products.push({title: req.body.title});
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products => {
        res.render('admin/products', {pageTitle: 'Admin Products', prods: products, path: '/admin/products'});
    }));
}