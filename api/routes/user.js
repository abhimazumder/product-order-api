const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length > 0){
            return res.status(422).json({
                message : "Email address already exists"
            })
        } else {
            bcrypt.hash(req.body.password, 10, function(error, hash) {
                if(error){
                    console.log(error);
                    return res.status(500).json({
                        error : error
                    })
                }
                const user = new User({
                    _id : new mongoose.Types.ObjectId(),
                    email : req.body.email,
                    password : hash
                })

                user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message : "User Created"
                    })
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error : error
                    });
                })
            });
        }
    })
});

router.get('/login', (req, res, next) => {
    User.findOne({email : req.body.email})
    .exec()
    .then(user => {
        if(user == null){
            return res.status(401).json({
                message : "Auth Failed"
            });
        }
        bcrypt.compare(req.body.password, user.password, function(error, result) {
                if(error){
                    return res.status(500).json({
                        error : error
                    })
                }
                if(result){
                    const token = jwt.sign({
                            _id : user._id,
                            email : user.email
                        },
                        process.env.PRIVATE_JWT_KEY,
                        {
                            expiresIn: '1h'
                        });
                    res.status(200).json({
                        message : "Auth Successful",
                        token : token
                    })
                } else {
                    res.status(401).json({
                        message : "Auth Failed"
                    })
                }
        });
    })
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id : id})
    .exec()
    .then(result => {
        console.log(result);
        if(result.deletedCount == 0)
            return res.status(404).json({
                message : "User doesn't exists"
            })
        res.status(200).json({
            message : "User Deleted",
            result : result
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        });
    })
})

module.exports = router;