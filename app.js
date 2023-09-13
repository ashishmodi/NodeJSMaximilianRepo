const http = require("http")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
// const routes = require('./routes');
// const server = http.createServer(routes);

const app = express();
app.set("view engine", "pug");
app.set("views", "views");  // path to views folder
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
    // res.sendFile(path.join(__dirname, 'views', '404.html'));
    res.render('404', {pageTitle: 'Page not found!'})
})

app.listen(3500);   // const server = http.createServer(app);