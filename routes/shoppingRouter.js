var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var Shoppingcarts = require('../models/shoppingcarts');
var passport = require('passport');
var authenticate = require('../authenticate');

var shoppingRouter = express.Router();
shoppingRouter.use(bodyParser.json());

shoppingRouter.route('/:username')
    .get(authenticate.verifyUser, authenticate.verifybuyer, (req,res,next) => {
        Shoppingcarts.findOne({username: req.params.username})
        .then((items) => {
            Item.find({item_id: {$in: items.items}, soldout: false})
            .then((info) => {
                res.StatusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(info);
            }, (err) => next(err))
            .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifybuyer, (req, res, next) => {
        Shoppingcarts.findOneAndUpdate({username: req.params.username}, { $pullAll: {items: [req.body.item_id] } })
        .then((buy)=> {
            Item.findOneAndUpdate({item_id: req.body.item_id}, {$inc: {"shoppingCartCount": req.body.buy}})
            .then((item) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Successfully remove from Shoppingcart!'});
            }, (err) => next(err))
            .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })

module.exports = shoppingRouter;