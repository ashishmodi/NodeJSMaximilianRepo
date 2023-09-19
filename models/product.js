const fs = require('fs')
const path = require('path');
const rootDir = require('../util/path');

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
    constructor(title) {
        this.title = title;
    }
    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
        // products.push(this);     // save to file
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}