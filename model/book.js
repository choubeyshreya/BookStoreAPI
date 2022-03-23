mysql = require('mysql')
express = require('express')
app = express()

app.connect(function(err) {
    if (err) throw err;

    app.query('CREATE DATABASE IF NOT EXISTS bookstore;');
    app.query('USE bookstore;');
    app.query('CREATE TABLE IF NOT EXISTS books(id int NOT NULL AUTO_INCREMENT, isbn varchar(50), title varchar(255), author varchar(255),description varchar(255), genre varchar(255), price int, quantity int PRIMARY KEY(isbn));', function(error, result, fields) {
        console.log(result);
    });
    app.end();
});

