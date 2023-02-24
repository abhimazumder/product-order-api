const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads/');
    },
    filename : function(req, file, cb){
        cb(null, new mongoose.Types.ObjectId + '_' + file.originalname);
    }
});
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : (req, file, cb) => {
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
            cb(null, true);
        else
            cb(null, false);
    }
});

router.get('/', (req, res, next) => {
    Product.find()
    .select('_id name price')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            products : docs.map(doc => {
                return {
                    _id : doc._id,
                    name : doc.name,
                    price : doc.price,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/products/" + doc._id
                    }
                }
            }),
        }
        console.log(response);
        res.status(200).json(response);
    })
    .catch(error => {
        console.log(error);
        res.status(404).json({
            error : error
        });
    })
});

router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : "http://localhost:3000/uploads/" + req.file.filename
    })
    product
    .save()
    .then(doc => {
        console.log(doc);
        res.status(201).json({
            message : 'Product Saved',
            product : {
                _id : doc._id,
                name : doc.name,
                price : doc.price,
                productImage : doc.productImage,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/products/" + doc._id
                }
            }
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        });
    });
    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('_id name price productImage')
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            return res.status(200).json(doc);
        }
        res.status(404).json({
            message : "No valid entry found for given ID"
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        })
    })
});

router.patch('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    let updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id : id}, {$set : updateOps})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json({
            message : "Product Updated",
            request : {
                type : "GET",
                url : "http://localhost:3000/products/" + id
            }
        });
    })
    .catch(error => {
        onsole.log(error);
        res.status(500).json({
            error : error
        });
    })
});

router.delete('/:productId', checkAuth,(req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id : id})
    .exec()
    .then(result => {
        if(result.deletedCount == 0)
            return res.status(404).json({
                message : "No valid entry found for given ID"
            })
        res.status(200).json({
            message : "Product Deleted",
            request : {
                type : "GET",
                url : "http://localhost:3000/products/"
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error : error
        });
    })
});

module.exports = router;