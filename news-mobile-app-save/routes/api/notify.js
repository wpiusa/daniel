import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import Notify  from '../../models/Notify';

// @route   GET api/notify/token/:token
// @desc    Get  by all notification by token a
// @access  Public

router.get('/token/:token', (req, res) => {
  const errors = {};

  Notify.find({ token: req.params.token })
    .then(token => {
      if (!token) {
        errors.notoken = 'There is no token for the device';
        res.status(404).json(errors);
      }

      res.json(token);
    })
    .catch(err => res.status(404).json(err));
});


// @route   GET api/notify/token/:token/category/:category
// @desc    Get  by notification by token and category
// @access  Public

router.get('/token/:token/category/:category', (req, res) => {
  const errors = {};

  Notify.find({ token: req.params.token, category:req.params.category })
    .then(token => {
      if (!token) {
        errors.notoken = 'There is no token for the device';
        res.status(404).json(errors);
      }

      res.json(token);
    })
    .catch(err => res.status(404).json(err));
});

/*
var query = { name: 'borne' };
Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
*/
// @route   PUT api/notify/token/:token
// @desc    Get notify by token
// @access  Public

router.put('/token/:token/category/:category', (req, res) => {
  const errors = {};

  console.log('debug start -----------')
  console.log(req.params.token);
  console.log(req.params.category);

  var query = { token: req.body.token, category:req.body.category };

  Notify.findOneAndUpdate(query,{
    token: req.body.token,
    category: req.body.category,
    msg:req.body.msg,
    value:req.body.value,
  }).then(notify => {
    console.log(notify);
    res.json(notify);
  })
  .catch(err => res.status(404).json(err));
});

// @route   DELETE api/notify/:id
// @desc    Delete token
// @access  Private
router.delete(
  '/:id', (req, res) => {
    
      Notify.findById(req.params.id)
        .then(token => {
          
          // Delete
          token.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ tokennotfound: 'No category found' }));
   
  }
);



// @route   POST api/notify
// @desc    Create or edit notifycation
// @access  Private
router.post('/', (req, res) => {
    
    const notifyFields = {};

    if (req.body.token) notifyFields.token = req.body.token;
    if (req.body.category) notifyFields.category = req.body.category;
    if (req.body.msg) notifyFields.msg = req.body.msg;
    if (req.body.value) notifyFields.value = req.body.value;  
    // Save Notify
      new Notify(notifyFields).save().then(notify => res.json(notify))
      .catch(err => res.status(404).json(err));
    });

module.exports = router;