import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

export default function RoleEditForm(props) {
  return (
    <form>
      <TextField
        type="text"
        name="role_name"
        placeholder="role name"
        defaultValue={props.role.role_name}
        onChange={props.onChange}
        fullWidth
      />
    </form>
  );
}

RoleEditForm.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number.isRequired,
    role_name: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func.isRequired
};
