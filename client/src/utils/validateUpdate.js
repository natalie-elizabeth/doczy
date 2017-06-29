import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


const validateInput = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.confirm)) {
    errors.confirm = 'This field is required';
  }
  if (!Validator.equals(data.password, data.confirm)) {
    errors.confirm = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
