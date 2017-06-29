import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Enter name';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateInput;
