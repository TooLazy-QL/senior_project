var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Item = require('../models/items');
var Favorites = require('../models/favorites');
var Shoppingcart = require('../models/shoppingcarts');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const user = require('../models/user');
const Items = require('../models/items');
const {spawn} = require('child_process');

var itemDetailRouter = express.Router();
itemDetailRouter.use(bodyParser.json());

itemDetailRouter.route('/:item_id')
    .get(authenticate.verifyUser, authenticate.verifybuyer, (req,res,next) => {
        Item.findOne({item_id: req.params.item_id})
        .then((item) => {
            User.findOne({username: item.seller})
            .then((user) => {
                var ans = {};
                ans.images = item.images;
                ans.name = item.name;
                ans.price = item.price;
                ans.seller = item.seller;
                ans.favoriteCount = item.favoriteCount;
                ans.shoppingCartCount = item.shoppingCartCount;
                ans.quantity = item.quantity;
                ans.condition = item.condition;
                ans.delivery = item.delivery;
                ans.sizeInfo = item.sizeInfo;
                ans.productInsurance = item.productInsurance;
                ans.detachable = item.detachable;
                ans.careIns = item.careIns;
                ans.damage = item.damage;
                ans.comments = item.comments;
                ans.zipcode = user.zipcode;
                ans.contact = user.phone + ' OR '+user.email;
                ans.credit = user.credit;
                res.StatusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ans);
            }, (err) => next(error))
            .catch((err) => next(err));
        }, (err) => next(error))
        .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifybuyer, (req, res, next) => {
        if(req.body.fav){
            Favorites.findOne({username: req.body.username})
            .then((user_fav) => {
                if(user_fav){
                    var items = user_fav.items;
                    var found = false;
                    for (var i = 0; i < items.length && found == false; i++) {
                        if(items[i] == req.params.item_id) found = true;
                    }
                    if(found == false){
                        Favorites.findOneAndUpdate({username: req.body.username}, { "$push": { "items": req.params.item_id }})
                        .then((fav) => {
                            Items.findOneAndUpdate({item_id: req.params.item_id}, {$inc : {'favoriteCount' : req.body.fav}})
                            .then((item) => {
                                res.StatusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({success: true, status: 'Successfully add to Fav List!'});
                            }, (err) => next(error))
                            .catch((err) => next(err));
                        }, (err) => next(error))
                        .catch((err) => next(err));
                    }
                    else{
                        res.StatusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: false, status: 'This item has already been added to your Favorite List!'});
                    }
                }
                else{
                    var savedata = new Favorites({
                        "username": req.body.username,
                        "items": [req.params.item_id]
                    }).save(function(err, result) {
                        if (err){
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({success: false, err: err});
                        }
                        else{
                            Items.findOneAndUpdate({item_id: req.params.item_id}, {$inc : {"favoriteCount" : req.body.fav}})
                            .then((item) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({success: true, status: 'Successfully add to Fav List!'});
                            }, (err) => next(error))
                            .catch((err) => next(err));
                        }
                    })
                }
            }, (err) => next(error))
            .catch((err) => next(err));
        }
        else if(req.body.buy){
            Shoppingcart.findOne({username: req.body.username})
            .then((user_buy) => {
                if(user_buy){
                    var items = user_buy.items;
                    var found = false;
                    for (var i = 0; i < items.length && found == false; i++) {
                        if(items[i] == req.params.item_id) found = true;
                    }
                    if(found == false){
                        Shoppingcart.findOneAndUpdate({username: req.body.username}, { "$push": { "items": req.params.item_id }})
                        .then((fav) => {
                            Items.findOneAndUpdate({item_id: req.params.item_id}, {$inc : {'shoppingCartCount' : req.body.buy}})
                            .then((item) => {
                                res.StatusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({success: true, status: 'Successfully add to Shoppingcart!'});
                            }, (err) => next(error))
                            .catch((err) => next(err));
                        }, (err) => next(error))
                        .catch((err) => next(err));
                    }
                    else{
                        res.StatusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: false, status: 'This item has already been added to your Shoppingcart!'});
                    }
                }
                else{
                    var savedata = new Shoppingcart({
                        "username": req.body.username,
                        "items": [req.params.item_id]
                    }).save(function(err, result) {
                        if (err){
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({success: false, err: err});
                        }
                        else{
                            Items.findOneAndUpdate({item_id: req.params.item_id}, {$inc : {"shoppingCartCount" : req.body.buy}})
                            .then((item) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({success: true, status: 'Successfully add to Shoppingcart!'});
                            }, (err) => next(error))
                            .catch((err) => next(err));
                        }
                    })
                }
            }, (err) => next(error))
            .catch((err) => next(err));
        }
        else{
            Item.findOneAndUpdate({item_id: req.params.item_id}, { "$push": { "comments": {"rating": req.body.rating, "serviceRating": req.body.serviceRating, "comment": req.body.comment, "author": req.body.username}}})
            .then((item) => {
                User.findOne({username: item.seller})
                .then((user) => {
                    var input = {};
                    input.sizeInfo = item.sizeInfo;
                    input.detachable = item.detachable;
                    input.careIns = item.careIns;
                    input.productInsurance = item.productInsurance;
                    input.damage = item.damage;
                    input.soldout = item.soldout;
                    input.seller = item.seller;
                    input.comments = item.comments;
                    input.imageScore = item.imageScore;
                    input.approve = item.approve;
                    input.credit = user.credit;

                    var lastComment = {};
                    lastComment.rating = req.body.rating;
                    lastComment.serviceRating = req.body.serviceRating;
                    lastComment.comment = req.body.comment;
                    input.comments.push(lastComment);

                    var python = spawn('python', ['JsonTest.py', JSON.stringify(input)]);
                    var output;
                    python.stdout.on('data', (data) => {
                        output = JSON.parse(data.toString());
                    });
                    python.on('close', (code) => {
                        // res.statusCode = 200;
                        // res.setHeader('Content-Type', 'application/json');
                        // res.json({success: true, status: JSON.stringify(output)});
                        User.findOneAndUpdate({username: output.seller}, {"$set": {"credit": output.credit}})
                        .then((uu) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({success: true, status: 'Successfully post your comment!'});
                        }, (err) => next(error))
                        .catch((err) => next(err));
                    });
                }, (err) => next(error))
                .catch((err) => next(err));
            }, (err) => next(error))
            .catch((err) => next(err));
        }
    })
    

module.exports = itemDetailRouter;