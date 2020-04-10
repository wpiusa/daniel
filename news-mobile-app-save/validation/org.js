const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrgInput(data) {
  let errors = {};

  
  if (Validator.isEmpty(data.org)) {
    errors.org = 'Organization name is required';
  }

  if (Validator.isEmpty(data.orgimg)) {
    errors.orgimg = 'Organization header image URL is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
