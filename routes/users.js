const express = require('express')
const router =  express.Router()

module.exports = router

//add customer
router.post('/', (req,res) => {
    res.send('Hello Nodejs')
})

// retrieve a customer by the numeric ID
router.put('/:id ', (req,res) => {
    res.send(req.params.id)
})

// retrieve a customer by the  user ID
router.put('/userId=:userId ', (req,res) => {
    res.send(req.params.id)
})
