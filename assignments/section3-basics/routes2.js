const fs = require('fs')

const requestHandlerAssgmt = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write("<html><body><form action='/create-user'>Hello Node!</body></html>");
        return res.end();
    }
    if (url === '/users') {
        res.write("<html><body><ul><li>User 1</li><li>User 2</li></ul></body></html>");
        return res.end();
    }

}

module.exports = requestHandlerAssgmt;