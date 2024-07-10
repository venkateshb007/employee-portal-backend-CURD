const dotenv = require('dotenv');
const express = require('express');
const app = express(); // Correctly create an instance of the express application

// Configure dotenv
dotenv.config({path : './config/config.env'});


// configure express to receive form data
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

app.get('/', (request, response)=>{
    response.send(`<h1>Express Js Rest API </h1>`);
});


//configure Router
app.use('/employees', require('./router/employeeRouter'))


app.listen(port, hostname, ()=>{
    console.log(`express server started at http://${hostname}:${port}`);
});


  