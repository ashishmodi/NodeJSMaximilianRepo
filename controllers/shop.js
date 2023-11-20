//const products = [];  // use model
const Product = require('../models/product')
// code moved to new admin controller
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index', {pageTitle: 'Shop', prods: rows, path: '/'});
    })
    .catch(err => console.error(err));
}

exports.getProducts = (req, res) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {pageTitle: 'All products', prods: rows, path: '/products'});
    })
    .catch(err => console.error(err));
};

exports.getProduct = (req, res) => {
    const productId = req.params.productId;     // productId is used in route
    Product.findProductById(productId)
    .then(([rows]) => {
        res.render('shop/product-detail', {pageTitle: rows.title, path:"/products", product: rows[0]});
    })
    .catch(err => console.error(err));
}   

exports.getCart = (req, res) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (const product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', { pageTitle: 'Your Cart', path: '/cart', products: cartProducts });
        })
    });    
};

exports.postCart = (req, res) => {
    const prodId = req.body.productId;      // productId is hidden in view
    console.log(prodId);
    Product.findProductById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findProductById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart')
    })
    
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: 'Your Orders', path: '/orders' });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
}