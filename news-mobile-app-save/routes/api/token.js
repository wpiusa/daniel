import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import Token  from '../../models/Token';

// @route   GET api/token/all
// @desc    Get all orgs
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
  
    Token.find()
      .then(tokens => {
        if (!tokens) {
          errors.notoken = 'There are no token';
          return res.status(404).json(errors);
        }
  
        res.json(tokens);
      })
      .catch(err => res.status(404).json({ token: 'There are no tokens' }));
  });

// @route   POST api/token
// @desc    Create token
// @access  Private
router.post('/', (req, res) => {
    
    const tokenFields = {};

    if (req.body.token) tokenFields.token = req.body.token;
    
    // Save Notify
      new Token(tokenFields).save().then(token => res.json(token))
      .catch(err => res.status(404).json(err));
    });

module.exports = router;