const express = require('express');
const db = require('./db')
const sql = require('mysql')

const app = express();
app.listen(3000, () =>{
   console.log('server started at port 3000');
});

db;
console.log('Database connection done !!');

// create table
app.use(express.json());
const bookRoute = require('./routes/books');
app.use('/books',bookRoute);

// create table 2
app.use(express.json());
const userRoute = require('./routes/customers');
app.use('/customers',userRoute);