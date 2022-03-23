const express = require('express')
const router =  express.Router()
const db = require('../db')

module.exports = router

//add book
router.post('/', (req,res) => {
    if (req.body.userId && req.body.name && req.body.phone && req.body.address && req.body.city && req.body.state && req.body.zipcode) {
        console.log('Request received');
        db.connect(function(err) {
            if(req.body.address2)
                address2 = req.body.address2;
            else
                address2 = '-';
            console.log(address2);
            db.query(`INSERT INTO bookstore.customers (userId, name, phone, address, address2, city, state, zipcode) VALUES ('${req.body.userId}', '${req.body.name}', '${req.body.phone}', '${req.body.address}', '${address2}', '${req.body.city}', '${req.body.state}', '${req.body.zipcode}')`, function(err, result, fields) {
                if (err){
                    res.status(422).send("{ \n \"message\" : \"This user ID already exists in the  system\" \n}")

                }
                console.log('Data inserted');
                console.log(req.body.userId);
                try{
                    console.log('here now');
                    let queryRes =  `SELECT * from bookstore.customers where userId = '${req.body.userId}'`;
                    let query = db.query(queryRes,(err, results) => {
                        if(err){
                            res.status(422).send("{ \n \"message\" : \"This user ID already exists in the  system\" \n}")
                        }
                        console.log(results);
                        res.status(201).json(results[0]);
                    });

                }catch(err){
                    res.status(422).send("{ \n \"message\" : \"This user ID already exists in the  system\" \n}")
                }
            });
        });
    } else {
        res.status(400).send("{ \n \"message\" : \" Illegal, missing, or malformed input \" \n}")
    }
});


//retrieve customer userId
router.get('/p', (req,res) => {
    console.log('entered here in user Id!!');

        db.connect(function (err) {
            console.log(req.query.userId);
            try {
                console.log('User Id!!');
                let queryRes = `select * from  bookstore.customers where userId = '${req.query.userId}'`;
                let query = db.query(queryRes, (err, results) => {
                    if (err) {
                        res.status(404).send("{ \n \"message\" : \"  ID does not exist in the system \" \n}")
                    }
                    if(results.length === 0 || query == null){
                        res.status(404).send("{ \n \"message\" : \"ID does not exist in the system\" \n}");
                        return;
                    }
                    console.log(results.length);
                    res.status(201).json(results[0]);
                    console.log('userID id customer method');
                });

            } catch (err) {
                res.status(404).send("{ \n \"message\" : \"   Illegal, missing, or malformed input \" \n}")
            }
        });

});




// retrieve customer based on numeric id

router.get('/:id', (req,res) => {
    console.log('entered here in numeric ID!!');
    if (req.params.id) {
        console.log('Request received');
        db.connect(function (err) {
            console.log(req.params.id);
            try {
                console.log('Numeric Id!!');
                let queryRes = `select * from  bookstore.customers
                                where id = '${req.params.id}'`;
                let query = db.query(queryRes, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if(results.length === 0 || query == null){
                        res.status(404).send("{ \n \"message\" : \"ID does not exist in the system\" \n}");
                        return;
                    }
                    console.log(results.length);
                    res.status(201).json(results[0]);
                    console.log('Numeric id customer method');
                });

            } catch (err) {
                res.status(404).send("{ \n \"message\" : \"  ID does not exist in the system \" \n}")
            }
        });
    } else {
        res.status(400).send("{ \n \"message\" : \"   Illegal, missing, or malformed input \" \n}")
    }
});