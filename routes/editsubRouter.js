var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var editsubRouter = express.Router();
editsubRouter.use(bodyParser.json());

editsubRouter.route('/:item_id')
    .get(authenticate.verifyUser, authenticate.verifySeller, (req,res,next) => {
        Item.findOne({item_id: req.params.item_id})
        .then((item) => {
            User.find({"seller": false, "admin": false}).select("username")
            .then((users) => {
                res.StatusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({item: item, users: users});
            }, (err) => next(err))
            .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifySeller, (req, res, next) => {
        const filter = { item_id: req.params.item_id };
        var soldout = false;
        if(req.body.quantity <= 0) soldout = true;
        const update = { 
            "images": req.body.image,
            "name": req.body.title,
            "price": req.body.price,
            "quantity": req.body.quantity,
            "condition": req.body.condition,
            "delivery": req.body.delivery,
            "category": req.body.category,
            "subCategory": req.body.subCategories,
            "sizeInfo": req.body.sizeInfo,
            "detachable": req.body.detachable,
            "careIns": req.body.careIns,
            "productInsurance": req.body.productInsurance,
            "damage": req.body.damage,
            "soldout": soldout,
            "buyer": req.body.buyer
        };
        Item.findOneAndUpdate(filter, update, {
            new: true
          })
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Update Successful!'});
        }, (err) => next(err))
        .catch((err) => next(err));
    })

module.exports = editsubRouter;