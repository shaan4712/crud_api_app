const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //as we are sending json data to server

app.get('/', (req, res) => {
    res.send('Welcome to my hotel !!');
})

//req - user se jo request aa rha 
//res - user ko jo response server dega

//routes are written alag se & imported here  

const personRoutes = require('./routes/personRoute');
app.use('/person', personRoutes); //using person routes

const menuRoutes = require('./routes/menuRoute');
app.use('/menu', menuRoutes); //using menu routes

//localhost:3000
app.listen(3000, () => {
    console.log("Listening on port 3000");
})