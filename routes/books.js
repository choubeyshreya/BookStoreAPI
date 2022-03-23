const express = require('express')
const router =  express.Router()
const db = require('../db')

module.exports = router

/*
isbn varchar(50),
title varchar(255),
author varchar(255),
description varchar(255),
genre varchar(255),
price int,
quantity int

*/
//add book
router.post('/', (req,res) => {
    if (req.body.ISBN && req.body.title && req.body.Author && req.body.description && req.body.genre && req.body.price && req.body.quantity) {
        console.log('Request received');
        db.connect(function(err) {
            console.log(req.body.ISBN);
            db.query(`INSERT INTO bookstore.books (isbn, title, author, description, genre, price, quantity) VALUES ('${req.body.ISBN}', '${req.body.title}', '${req.body.Author}', '${req.body.description}', '${req.body.genre}', '${req.body.price}', '${req.body.quantity}')`, function(err, result, fields) {
                if (err){
                    res.send(err);
                    return;
                }
                console.log('Data inserted');

                try{
                    System.out.println("Data inserted !! ");
                    let isbn = req.body.ISBN;
                    let bookResult = db.query(`select * from bookstore.books where isbn = ${isbn}`);
                    res.status(201).json(bookResult.result);
                    res.send(req.body);
                }catch(err){
                    res.send(err);
                }


            });
        });
    } else {
        console.log('Missing a parameter');
    }
});

//update book
router.put('/:ISBN ', (req,res) => {
    res.send(req.params.ISBN);
})

//retrieve book
router.get('/isbn/:ISBN', (req,res) => {
    if (req.params.ISBN){
        console.log('Request received');
        db.connect(function(err) {
            console.log(req.params.ISBN);
            try{
                console.log('here now');
                let queryRes =  `SELECT * from bookstore.books where isbn = '${req.params.ISBN}'`;
                let query = db.query(queryRes,(err, results) => {
                    if(err){
                        console.log(err);
                        return;
                    }

                    console.log(results);

                    res.status(201).json(results[0]);
                });




            }catch(err){
                res.send(err);
            }
        });
    }else {
        console.log('Missing a parameter');
    }
});

