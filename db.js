const mysql = require("mysql");

const db = mysql.createConnection({
    host:"nodejsapp.cefngpknebsd.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"admin",
    password:"password",
    database:"bookstore"
});

db.connect(err=> {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Database connected");
    // db.query('CREATE DATABASE IF NOT EXISTS bookstore;');
    db.query('USE bookstore;');
    let bookSql = 'CREATE TABLE IF NOT EXISTS books(ISBN varchar(50), title varchar(255), Author varchar(255), description varchar(255), genre varchar(255), price int, quantity int, PRIMARY KEY(ISBN));'
    db.query(bookSql, (error, result) => {
        if(error)
            console.log(error.message);

    });

    let custSql = 'CREATE TABLE IF NOT EXISTS customers(id int NOT NULL AUTO_INCREMENT, userId varchar(50) , name varchar(255), phone varchar(50),address varchar(255), address2 varchar(255), city varchar(50), state varchar(100), zipcode int ,PRIMARY KEY(id), UNIQUE (userId))';
    db.query(custSql, (error, result, ) =>{
        if(error)
            console.log(error.message);
        console.log(result);

    });

});

module.exports = db;