const express = require('express')
const router =  express.Router()
const db = require('../db')

module.exports = router

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
                console.log(req.body.ISBN);
                try{
                    console.log('here now');
                    let queryRes =  `SELECT * from bookstore.books where isbn = '${req.body.ISBN}'`;
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
        });
    } else {
        console.log('Missing a parameter');
    }
});


    //retrieve book
    router.get('/isbn/:ISBN', (req,res) => {
        if (req.params.ISBN){
            console.log('Request received');
            db.connect(function(err) {
                console.log(req.params.ISBN);
                try{
                    console.log('In get method 2');
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




    // update book


router.put('/:ISBN', (req,res) => {
    console.log('entered here in update!!');
    if (req.params.ISBN) {
        console.log('Request received');
        db.connect(function (err) {
            console.log(req.params.ISBN);
            try {
                console.log('updates now!!');
                let queryRes = `UPDATE bookstore.books
                                set title       = '${req.body.title}',
                                    author      = '${req.body.author}',
                                    description = '${req.body.description}',
                                    genre       = '${req.body.genre}',
                                    price       = '${req.body.price}',
                                    quantity    = '${req.body.quantity}'
                                where isbn = '${req.body.ISBN}'`;
                let query = db.query(queryRes, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Data updated');
                });

            } catch (err) {
                res.send(err);
            }

            try {
                console.log('updating and what??');
                let queryRes = `SELECT *
                                from bookstore.books
                                where isbn = '${req.params.ISBN}'`;
                let query = db.query(queryRes, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(results);
                    res.status(201).json(results[0]);
                });

            } catch (err) {
                res.send(err);
            }
        });
    } else {
        console.log('Missing a parameter');
    }
});