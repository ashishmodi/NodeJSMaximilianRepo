const http = require("http")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
// const routes = require('./routes');
// const server = http.createServer(routes);
const errorController = require('./controllers/error');
// const db = require('./util/database')
const sequelize = require('./util/database')

const app = express();
// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");  // path to views folder
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* dummy code to test the DB connection
// db.execute('SELECT * FROM products')
// .then(result => { console.log(result[0], result[1]); })
// .catch(err =>   { console.error(err); }) */

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))

// app.use('/admin', adminData.routes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

/*app.use((req, res) => {
    // res.sendFile(path.join(__dirname, 'views', '404.html'));
    res.render('404', {pageTitle: 'Page not found!'})
})*/
app.use(errorController.get404);

sequelize.sync()
.then(result => {
    console.log(result);
    app.listen(3500);   // const server = http.createServer(app);
})
.catch(err => console.error("Error initializing Sequelize: ", err) );