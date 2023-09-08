const express = require('express')

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
});

router.post('/product', (req, res) => {     // app.post
    console.log(req.body);      // {title: 'Book'}
    res.redirect('/');
});

module.exports = Router;

