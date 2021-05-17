
const express = require('express');
const app = express();


const morgan = require('morgan');
const mongoose = require('mongoose');
const cors  = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;


// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

// Routes
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');


// //ROuters
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes) ;
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes); 

//Database
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshopDB' 
})
.then(() => {
    console.log('Databse ready!!');
})
.catch((err) => {
    console.log(err);
})

// app.listen(3000, () => {
//     console.log(api)
//     console.log("server is running")
// })

var server = app.listen(process.env.PORT || 3000, function () {
   var port = server.address().port; 
   console.log("Express is working on port " + port); 
  });

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const cors  = require('cors');
// require('dotenv/config');
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler');


// app.use(cors());
// app.options('*', cors());



// const api = process.env.API_URL;



// //middleware
// app.use(bodyParser.json());
// app.use(morgan('tiny'));
// app.use(authJwt);
// app.use(errorHandler);



// //Routes
// const categoriesRoutes = require('./routers/categories');
// const productsRoutes = require('./routers/products');
// const usersRoutes = require('./routers/users');
// const ordersRoutes = require('./routers/orders');


// //ROuters
// app.use(`${api}/categories`, categoriesRoutes);
// app.use(`${api}/products`, productsRoutes) ;
// app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes); 

// mongoose.connect(process.env.CONNECTION_STRING,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'eshopDB' 
// })
// .then(() => {
//     console.log('Databse ready!!1');
// })
// .catch((err) => {
//     console.log(err);
// })

// app.listen(3000, () => {
   
//     console.log('hello world from local host')
// })

// //console.log('hello world')