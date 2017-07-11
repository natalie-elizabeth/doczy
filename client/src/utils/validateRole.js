import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.role_name)) {
    errors.role_name = 'Enter role name';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateInput;
