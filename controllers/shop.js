//const products = [];  // use model
const Product = require('../models/product')
// code moved to new admin controller
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    // using mysql2
    /* Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index', {pageTitle: 'Shop', prods: rows, path: '/'});
    })
    .catch(err => console.error(err)); */

    Product.findAll()
    .then(products => {
        res.render('shop/index', {pageTitle: 'Shop', prods: products, path: '/'});
    })
    .catch(err => console.error(err))
}

exports.getProducts = (req, res) => {
    /*Product.fetchAll()        // using mysql2
    .then(([rows, fieldData]) => {
        res.render('shop/product-list', {pageTitle: 'All products', prods: rows, path: '/products'});
    })
    .catch(err => console.error(err));*/

    Product.findAll()
    .then(products => {
        res.render('shop/product-list', {pageTitle: 'All products', prods: products, path: '/products'});
    })
    .catch(err => console.error(err))
};

exports.getProduct = (req, res) => {
    const productId = req.params.productId;     // productId is used in route
    // Product.findProductById(productId)
    // .then(([rows]) => {
    //     res.render('shop/product-detail', {pageTitle: rows.title, path:"/products", product: rows[0]});
    // })
    // .catch(err => console.error(err));

    // Product.findByPk(productId)
    // .then(product => {
    //     res.render('shop/product-detail', {pageTitle: product.title, path:"/products", product: product});
    // })
    // .catch(err => console.error(err));

    // Alternative approach using findAll instead of findByPk
    Product.findAll({where: { id: productId }})     // returns an array
    .then(products => {
        res.render('shop/product-detail', {pageTitle: products[0].title, path:"/products", product: products[0]});
    })
    .catch(err => console.error(err));
}   

exports.getCartWithoutUser = (req, res) => {
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

exports.getCart = (req, res) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts();      // many to many relationship
    })
    .then(products => {
        res.render('shop/cart', { pageTitle: 'Your Cart', path: '/cart', products: products });
    })
    .catch(err => console.error(err));
}

exports.postCartWithoutUser = (req, res) => {
    const prodId = req.body.productId;      // productId is hidden in view
    console.log(prodId);
    Product.findProductById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
        let product;
        if (products.length > 0)
            product = products[0];        
        if (product) {      // product is already part of the cart
            const oldQuantity = product.cart_items.quantity;
            newQuantity = oldQuantity + 1;
            return product;            
        }
        return Product.findByPk(prodId)        
    })
    .then(product => {
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity }})
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.error(err));
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    /*Product.findProductById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart')
    })*/
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
        const product = products[0];
        return product.cart_items.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.error(err));
}

exports.getOrders = (req, res) => {
    // res.render('shop/orders', { pageTitle: 'Your Orders', path: '/orders' });    // wo user
    // req.user.getOrders()     // doesn't include order_items key by default
    req.user.getOrders({ include: ['products'] })
    .then(orders => {
        res.render('shop/orders', { pageTitle: 'Your Orders', path: '/orders', orders: orders });
    })
    .catch(err => console.error(err));
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
}

exports.postCreateOrder = (req, res) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.order_items = { quantity: product.cart_items.quantity };
                return product;
            }))
        })
        .catch(err => console.error(err));
    })
    .then(result => {
        return fetchedCart.setProducts(null);        
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.error(err));
}