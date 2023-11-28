const http = require("http")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
// const routes = require('./routes');
// const server = http.createServer(routes);
const errorController = require('./controllers/error');
// const db = require('./util/database')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

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

app.use((req, res, next) => {     // Middleware
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.error("Can't find the user: " + err))
})

// app.use('/admin', adminData.routes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

/*app.use((req, res) => {
    // res.sendFile(path.join(__dirname, 'views', '404.html'));
    res.render('404', {pageTitle: 'Page not found!'})
})*/
app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);       // optional
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync( {force: true })         // delete existing table and recreates it
// sequelize.sync()
.then(result => {
    // console.log(result);
    return User.findByPk(1);    
})
.then(user => {
    if (!user) {
        return User.create({ name: 'Ashish', email: 'gashishmukesh92@gmail.com' });     // also returns Promise
    }
    return Promise.resolve(user);       // we can simply use: return user
})
.then(user => {
    // console.log(user);
    app.listen(3500);   // const server = http.createServer(app);
    console.log("Server started. Listening on port: 3500");
})
.catch(err => console.error("Error initializing Sequelize: ", err) );