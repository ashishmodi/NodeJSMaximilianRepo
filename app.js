const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
// const routes = require('./routes');
// const server = http.createServer(routes);

const app = express();
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(adminRoutes);



app.use('/', (req, res, next) => {
    res.send("<h1>Hello from Express / !</h1>");
});
// const server = http.createServer(app);
app.listen(3500);