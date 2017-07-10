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
        name="name"
        placeholder="Name"
        defaultValue={props.role.name}
        onChange={props.onChange}
        fullWidth
      />
    </form>
  );
}

RoleEditForm.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func.isRequired
};
