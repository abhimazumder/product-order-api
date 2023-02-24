const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://abhishek_mazumder:' + process.env.ATLAS_PASSWORD + '@app.x0fxewv.mongodb.net/?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Mathods', 'PUT, POST, GET, PATCH, DELETE')
        return res.status(200).json({});
    }

    next();
})

app.get('/', (req, res, next) => {
    res.status(400).json({
        metadata : {
            apiName : "product-order-api",
            createdBy : "Abhishek Mazumder",
            email : "abhishek.am988@gmail.com"
        },
        message : "Documentation is available on GitHub Repository",
        github : {
            request : {
                type : "GET",
                url : "https://github.com/abhimazumder/product-order-api"
            }
        }
    })
});

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message : error.message
    })
})

module.exports = app;