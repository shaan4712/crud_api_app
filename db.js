//this is model built using mongoose
const mongoose = require('mongoose');
require('dotenv').config();

//Define MongoDB connection URL
const mongoURL = process.env.MONGO_URL; //cluster link imported from .env file
// const mongoURL = process.env.MONGO_URL_LOCAL; 

//set up mongoDB connection
mongoose.connect(mongoURL + '/crudApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//get the default connection
//mongoose maintains a default connection
const db = mongoose.connection;

//Define event listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', (err) => {
    console.error('MongoDB connection error');
})

db.on('disconnected', () => {
    console.log('MongoDB server disconnected');
})

module.exports = db;