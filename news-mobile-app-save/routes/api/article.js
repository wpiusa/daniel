import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
const router = express.Router();

// Load Validation
const validateArticleInput = require('../../validation/article');

// Load Article Model
//const Article = require('../../models/Article');
import  Article  from '../../models/Article';
import  Token  from '../../models/Token';

import Expo from 'expo-server-sdk';
let expo = new Expo();

// @route   GET api/articles/all
// @desc    Get all articles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Article.find()
    .then(articles => {
      if (!articles) {
        errors.noarticle = 'There are no articles';
        return res.status(404).json(errors);
      }

      res.json(articles);
    })
    .catch(err => res.status(404).json({ article: 'There are no articles' }));
});

// @route   GET api/articles/category/:category
// @desc    Get all same categories
// @access  Public
router.get('/category/:category', (req, res) => {
  const errors = {};

  Article.find({ category: req.params.category })
    .then(category => {
      if (!category) {
        errors.nocategory = 'There are no category';
        return res.status(404).json(errors);
      }

      res.json(category);
    })
    .catch(err => res.status(404).json({ category: 'There are no category' }));
});


// @route   GET api/article/id/:id
// @desc    Get article by id
// @access  Public

router.get('/title/:id', (req, res) => {
  const errors = {};
 
  Article.findById(req.params.id)
     .then(article => {
      if (!article) {
        errors.noarticle = 'There is no article';
        res.status(404).json(errors);
      }

      res.json(article);
    })
    .catch(err => res.status(404).json(err));
});



router.put('/title/:title', (req, res) => {
  
  //const { errors, isValid } = validateArticleInput(req.body);
  //Check Validation
 // if (!isValid) {
  //  return res.status(400).json(errors);
 // }
  console.log('req body');
  console.log(req.body);
  
  Article.findOneAndUpdate({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    headerimgURL: req.body.headerimgURL,
    articleURL: req.body.articleURL,
    category: req.body.category,
    
  }).then(article => {
    res.json(article);
  })
  .catch(err => res.status(404).json(err));
});

// @route   POST api/article
// @desc    Create or edit article
// @access  Private
router.post('/', (req, res) => {
  const errors = {};
 // const { errors, isValid } = validateArticleInput(req.body);
  //Check Validation
 // if (!isValid) {
  //  return res.status(400).json(errors);
 // }

  const articleFields = {};

  if (req.body.title) articleFields.title = req.body.title;
  if (req.body.description) articleFields.description = req.body.description;
  if (req.body.author) articleFields.author = req.body.author;
  if (req.body.headerimgURL) articleFields.headerimgURL = req.body.headerimgURL;
  if (req.body.articleURL) articleFields.articleURL = req.body.articleURL;
  if (req.body.category) articleFields.category = req.body.category;
 
 
    new Article(articleFields).save().then(article => res.json(article))
    .then(() => pushNotification(articleFields))
    .catch(err => res.status(404).json(err));
});


function pushNotification(article) {

  console.log('start push pushNotification');
  var tokensArray = [];

  const msg =article.title;
  const content = article.description;
  
  Token.find({}, function(err, tokens) {
    if (err) throw err;
    
    tokensArray = tokens.map(token => token.token);
    
    if (tokensArray.length > 0 ) {
      const messages = tokensArray.map(token => ({
        to: token,
        title: article.title,
        sound: 'default',
        body: msg,
        data: { content },
      }))
          
      console.log(messages)
      
      const chunk = expo.chunkPushNotifications(messages)
      const receipts =  expo.sendPushNotificationsAsync(messages)
      console.log(receipts)
  
    }
    else {
      console.log(`cant write, ${tokensArray.length}`)
    }
    
    return tokensArray.length 
  });
 
}


// @route   DELETE api/article/:id
// @desc    Delete Article
// @access  Private
router.delete(
  '/:id', (req, res) => {
   
      Article.findById(req.params.id)
        .then(article => {
         
          // Delete
          article.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ articlenotfound: 'No article found' }));
});


module.exports = router;
