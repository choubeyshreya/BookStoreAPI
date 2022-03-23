const express = require('express')
const router =  express.Router()
const db = require('../db')

module.exports = router

//add book
router.post('/', (req,res) => {
    if (req.body.ISBN && req.body.title && req.body.Author && req.body.description && req.body.genre && req.body.price && req.body.quantity) {
        console.log('Request received');
        let priceUpdated = parseFloat(req.body.price).toFixed(2);
        db.connect(function(err) {
            console.log(req.body.ISBN);
            db.query(`INSERT INTO bookstore.books (ISBN, title, Author, description, genre, price, quantity) VALUES ('${req.body.ISBN}', '${req.body.title}', '${req.body.Author}', '${req.body.description}', '${req.body.genre}', '${priceUpdated}', '${req.body.quantity}')`, function(err, result, fields) {
                if (err){
                    res.status(422).send("{ \n \"message\" : \"This ISBN already exists in the system.\" \n}");
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
        res.status(400).send("{ \n \"message\" : \"Illegal, missing, or malformed input\" \n}");
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
                            res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}");
                            return;
                        }
                        if(results.length === 0 || query == null){
                            res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}");
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
            res.status(400).send("{ \n \"message\" : \"Illegal, missing, or malformed input\" \n}");
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
                    if(err){
                        res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}");
                        return;
                    }
                    if(results.length === 0 || query == null){
                        res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}");
                        return;
                    }
                    console.log('Data updated');
                });

            } catch (err) {
                res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}")
                res.send(err);
            }

            try {
                console.log('updating and what??');
                let queryRes = `SELECT *
                                from bookstore.books
                                where isbn = '${req.params.ISBN}'`;
                let query = db.query(queryRes, (err, results) => {
                    if(err){
                        res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}");
                        return;
                    }
                    if(results.length === 0 || query == null){
                        res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}");
                        return;
                    }
                    console.log(results);
                    res.status(201).json(results[0]);
                });

            } catch (err) {
                res.status(404).send("{ \n \"message\" : \"ISBN not found\" \n}")
            }
        });
    } else {
        res.status(400).send("{ \n \"message\" : \"Illegal, missing, or malformed input\" \n}")
    }
});