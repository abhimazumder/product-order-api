const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth, (req, res, next) => {
    Order.find()
    .select('_id productId quantity')
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json({
            count : docs.length,
            orders : docs.map(doc => {
                return {
                    _id : doc._id,
                    productId : doc.productId,
                    quantity : doc.quantity,
                    request : {
                        type : "GET",
                        url : "http://localhost:" + process.env.PORT + "/orders/" + doc._id
                    }
                }
            })
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        })
    })
});

router.post('/', checkAuth, (req, res, next) => {
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        productId : req.body.productId,
        quantity : req.body.quantity
    });
    order
    .save()
    .then(doc => {
        console.log(doc);
        res.status(201).json({
            message : "Order Saved",
            order : {
                _id : doc._id,
                productId : doc.productId,
                quantity : doc.quantity,
                request : {
                    type : "GET",
                    url : "http://localhost:" + process.env.PORT + "/orders/" + doc._id
                }
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        })
    })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            return res.status(200).json({
                _id : doc._id,
                productId : doc.productId,
                request : {
                    type : "GET",
                    url : "http://localhost:" + process.env.PORT + "/products/" + doc.productId
                },
                quantity : doc.quantity
            });
        }
        res.status(404).json({
            message : "No valid entry found for given ID"
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        })
    })
});

router.patch('/:orderId', checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    let updateOps = {};
    for(let ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Order.updateOne({_id : id}, {$set : updateOps})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json({
            message : "Order Updated",
            request : {
                type : "GET",
                url : "http://localhost:" + process.env.PORT + "/orders/" + id
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            error : error
        })
    })
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id : id})
    .exec()
    .then(result => {
        console.log("result", result);
        if(result.deletedCount == 0){
            return res.status(404).json({
                message : "No valid entry found for given ID"
            })
        }
        res.status(200).json({
            message : "Order Deleted",
            request : {
                type : "GET",
                url : "http://localhost:" + process.env.PORT + "/orders"
            }
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        })
    })
})

module.exports = router;