const http = require('http')
// const routes = require('./routes2')
const requestHandlerAssgmt = require('./routes2')

const server = http.createServer(requestHandlerAssgmt);
server.listen(3000)