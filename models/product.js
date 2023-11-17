const fs = require('fs')
const path = require('path');
const rootDir = require('../util/path');

const Cart = require('./cart');

// [{"title":"The Secret"},{"title":"You can win"},{"title":"7 Habits"},{"title":"21 Bubblegum & candies"},{"title":"My Journey"}]
// [{"id":"1","title":"7 Habits","imageUrl":"https://th.bing.com/th/id/OIP._zXfuEA95QhKw8_3pk3INgHaFG?w=265&h=188&c=7&r=0&o=5&pid=1.7","description":"Must have 7 Habits","price":"23"}]
const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {    
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            // return [];
            return cb([]);
        }
        // return JSON.parse(fileContent);
        cb(JSON.parse(fileContent));
    })
    // return products;
}

// const products = [];
module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {        
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }            
        });
        // products.push(this);     // save to file
    }

    static deleteById (id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            // const productIndex = products.findIndex(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findProductById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}