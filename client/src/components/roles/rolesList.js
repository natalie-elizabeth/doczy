import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Card, CardText } from 'material-ui/Card';
import RolesView from './rolesView';


const RolesList = ({ roles, handleOpen, style }) => (
  <div>
    <Card>
      {roles.map(role =>
        <RolesView key={role.id} role={role} />
      )}
    </Card>
    <div>
      <FloatingActionButton onClick={handleOpen} style={style}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div >
);
RolesList.propTypes = {
    roles: PropTypes.array.isRequired,
    handleOpen: PropTypes.func.isRequired,
    style: PropTypes.func.isRequired
};

export default RolesList;
