import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};


  if (Validator.isEmpty(data.username)) {
    errors.userName = 'Enter username';
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstName = 'Enter firstname';
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastName = 'Enter lastname';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Your email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords don\'t match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
