const Product = require('../models/product')
exports.getAddProduct = (req, res) => {
    // res.render('admin/add-product', {pageTitle: 'Add product', path: '/admin/add-product'});
    res.render('admin/edit-product', {pageTitle: 'Add product', path: '/admin/edit-product', editing: false});  // use edit for add product as well - code resuse
};

exports.postAddProduct = (req, res) => {
    // products.push({title: req.body.title});
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    // const product = new Product(null, title, imageUrl, description, price);
    // product.save();          // using file
    // product.save()          // using mySql2
    // .then(() => {
    //     res.redirect('/');
    // })
    // .catch(err => { console.error(err); });

    // Product.create({ title: title, image_url: imageUrl, price: price, description: description/*, userId: req.user.id */ })
    req.user.createProduct({ title: title, image_url: imageUrl, price: price, description: description })
    .then(result => {
        // console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => { console.error(err) })
};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    /* Product.findProductById(prodId, product => {        // using mySql2
        if (!product)
            return res.redirect('/');
        res.render('admin/edit-product', {pageTitle: 'Edit product', path: '/admin/edit-product', editing: editMode, product: product});  // use edit for add product as well - code resuse
    }); */

    // Product.findByPk(prodId)
    req.user.getProducts({ where: { id: prodId } })         // to find the product of currently logged in user only
    .then(products => {
        const product = products[0];
        if (!product)
            return res.redirect('/');
        res.render('admin/edit-product', {pageTitle: 'Edit product', path: '/admin/edit-product', editing: editMode, product: product});
    })
    .catch(err => { console.error(err) })
};

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    
    // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    // updatedProduct.save();

    Product.findByPk(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.image_url = updatedImageUrl;
        return product.save();
    })
    .then(result => {         // save also returns promise along with findByPk
        console.log("Updated product: " + result);
        res.redirect('/admin/products');
    })
    .catch(err => { console.error(err) })
};

exports.getProducts = (req, res) => {
    // Product.fetchAll((products => { res.render('admin/products', {pageTitle: 'Admin Products', prods: products, path: '/admin/products'}); }));
    // Product.findAll()
    req.user.getProducts()
    .then(products => { res.render('admin/products', {pageTitle: 'Admin Products', prods: products, path: '/admin/products'}) })
    .catch(err => { console.error(err) })
}

exports.postDeleteProducts = (req, res) => {
    const prodId = req.body.productId;
    // Product.deleteById(prodId);          // mysql2
    Product.findByPk(prodId)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        console.log("Deleted product: ", result);
        res.redirect('/admin/products')
    })    
    .catch(err => { console.error(err) })
}