const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //as we are sending json data to server

//localhost:3000
const PORT = process.env.PORT || 3000;

//Middleware function - logging is being done here
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); //a callback fn for middleware to move forward 
}
app.use(logRequest);

//Authentication middleware
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', localAuthMiddleware, (req, res) => {
    res.send('Welcome to my hotel !!');
})

//req - user se jo request aa rha 
//res - user ko jo response server dega

//routes are written alag se & imported here  

const personRoutes = require('./routes/personRoute');
app.use('/person', localAuthMiddleware, personRoutes); //using person routes

const menuRoutes = require('./routes/menuRoute');
app.use('/menu', menuRoutes); //using menu routes


app.listen(PORT, () => {
    console.log("Listening on port 3000");
})