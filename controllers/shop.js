//const products = [];  // use model
const Product = require('../models/product')
// code moved to new admin controller
const Cart = require('../models/cart');

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

exports.getProduct = (req, res) => {
    const productId = req.params.productId;     // productId is used in route
    Product.findProductById(productId, product => {
        res.render('shop/product-detail', {pageTitle: product.title, path:"/products", product: product});
    });
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