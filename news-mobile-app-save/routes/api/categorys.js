import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

const router = express.Router();
// Category model
//const Category = require('../../models/Category');
import Category  from '../../models/Category';

// Validation
const validateCategoryInput = require('../../validation/category');

// @route   GET api/categorys
// @desc    Get categorys
// @access  Public
router.get('/', (req, res) => {
  Category.find()
    .sort({ date: -1 })
    .then(categorys => res.json(categorys))
    .catch(err => res.status(404).json({ nocategorysfound: 'No categories found' }));
});

// @route   GET api/categorys/:id
// @desc    Get category by id
// @access  Public
router.get('/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err =>
      res.status(404).json({ nocategoryfound: 'No category found with that ID' })
    );
});

// @route   POST api/categorys
// @desc    Create category
// @access  Private
router.post(
  '/',  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newCategory = new Category({
      category: req.body.category,
      
    });

    newCategory.save().then(category => res.json(category));
  }
);

// @route   DELETE api/categorys/:id
// @desc    Delete category
// @access  Private
router.delete(
  '/:id', (req, res) => {
    
      Category.findById(req.params.id)
        .then(category => {
          
          // Delete
          category.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ categorynotfound: 'No category found' }));
   
  }
);

module.exports = router;
