const http = require("http")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
// const routes = require('./routes');
// const server = http.createServer(routes);

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3500);   // const server = http.createServer(app);