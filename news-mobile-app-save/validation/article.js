const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateArticleInput(data) {
  let errors = {};
  

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Article title is required';
  }
 
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Article short description is required';
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = 'Article author name is required';
  }

  if (!isEmpty(data.headerimgURL)) {
    if (!Validator.isURL(data.headerimgURL)) {
      errors.headerimgURL = 'Article header image URL is required';
    }
  }

  if (!isEmpty(data.articleURL)) {
    if (!Validator.isURL(data.articleURL)) {
      errors.articleURL = 'Article URL is required';
    }
  }


  if (Validator.isEmpty(data.category)) {
    errors.category = 'Article category is required';
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
