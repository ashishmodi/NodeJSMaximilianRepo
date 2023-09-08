const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')) // 
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {     // app.post
    console.log(req.body);      // {title: 'Book'}
    res.redirect('/');
});

module.exports = router;