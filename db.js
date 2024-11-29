//this is model built using mongoose

const mongoose = require('mongoose');

//Define MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'; //cluster link

//set up mongoDB connection
mongoose.connect(mongoURL, {
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