const fs = require('fs');

const requestHandler = (req, res) => {
    // console.log(req.headers);
    const url = req.url;
    const method = req.method;
    console.log(`Url = ${req.url}, Method = ${req.method}`);

    if (url === '/') {
        // res.setHeader('Content-Type', 'text/html');
        res.write('<html><body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body></html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const myMessage = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', myMessage);  // not for async
            fs.writeFile('message.txt', myMessage, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                return res.end();
            });
        });        
    }
    res.setHeader('Content-Type', 'text/html');
    
    res.write('<html><body>Hello from server</body></html>');
    res.end();      // server is still running
    // process.exit();  // to quit the server
};

module.exports = requestHandler;
// module.exports = { handler: requestHandler }    // alternate syntax
// module.exports.handler = requestHandler;     // can omit module 