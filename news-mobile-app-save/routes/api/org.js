import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

// Load Validation
const validateOrgInput = require('../../validation/org');

//const Org = require('../../models/Org');
import Org  from '../../models/Org';

// @route   GET api/org/all
// @desc    Get all orgs
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Org.find()
    .then(orgs => {
      if (!orgs) {
        errors.noorg = 'There are no organization';
        return res.status(404).json(errors);
      }

      res.json(orgs);
    })
    .catch(err => res.status(404).json({ org: 'There are no organization' }));
});
/*

// @route   GET api/org/org/:org
// @desc    Get org by org
// @access  Public

router.get('/org/:org', (req, res) => {
  const errors = {};

  Org.findOne({ org: req.params.org })
    .then(org => {
      if (!org) {
        errors.noorg = 'There is no organization for this user';
        res.status(404).json(errors);
      }

      res.json(org);
    })
    .catch(err => res.status(404).json(err));
});
*/
// @route   GET api/org/org/:id
// @desc    Get org by id
// @access  Public

router.get('/org/:id', (req, res) => {
  const errors = {};
  
  Org.findById(req.params.id)
    .then(org => {
      if (!org) {
        errors.noorg = 'There is no organization for this user';
        res.status(404).json(errors);
      }

      res.json(org);
    })
    .catch(err => res.status(404).json(err));
});


// @route   POST api/org
// @desc    edit org
// @access  Private
router.put('/org/:org', (req, res) => {
  const errors = {};

  Org.findOneAndUpdate({
    org: req.body.org,
    orgimg: req.body.orgimg,
    about1: req.body.about1,
    about2: req.body.about2,
    about3: req.body.about3,
    support1: req.body.support1,
    support2: req.body.support2,
    support3: req.body.support3,
  }).then(org => {
    res.json(org);
  })
  .catch(err => res.status(404).json(err));
});

// @route   POST api/org
// @desc    Create org
// @access  Private
router.post('/', (req, res) => {
    
    const orgFields = {};

    if (req.body.org) orgFields.org = req.body.org;
    if (req.body.orgimg) orgFields.orgimg = req.body.orgimg;
    if (req.body.about1) orgFields.about1 = req.body.about1;
    if (req.body.about2) orgFields.about2 = req.body.about2;
    if (req.body.about3) orgFields.about3 = req.body.about3;
    if (req.body.support1) orgFields.support1 = req.body.support1;
    if (req.body.support2) orgFields.support2 = req.body.support2;
    if (req.body.support3) orgFields.support3 = req.body.support3;

    // Save Org
      new Org(orgFields).save().then(org => res.json(org))
      .catch(err => res.status(404).json(err));
    });



module.exports = router;
