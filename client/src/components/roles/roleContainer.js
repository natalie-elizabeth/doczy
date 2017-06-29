
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as roleActions from '../../actions/roleActions';
import RolesView from './rolesView';
import RolesList from './rolesList';
import Roles from './createRole';
// import DocumentEditForm from './editDocument';

import * as tokenUtils from '../../utils/tokenUtils';

console.log('tokenUtil:', tokenUtils.getUserFromToken + '');

const style = {
  position: 'fixed',
  top: 80,
  right: 20,
  marginRight: 30,
};

export class RoleViewContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      role: {
        name: ''
      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }
  componentWillMount() {
    this.props.roleActions.listRoles();
  }

  onNameChange(e) {
    const Role = this.state.role;
    Role.name = e.target.value;
    this.setState({ role: Role });
  }

  handleOpen() {
    this.setState({ open: true, role: {} });
  }

  handleClose() {
    this.setState({ open: false, edit: false });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      role: Object.assign({}, this.state.role, {
        [name]: value
      })
    });
  }

  updateRole(role) {
    return e => {
      this.setState({
        role,
        edit: true,
        open: true,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.edit
      ? this.props.roleActions.updateRole(this.state.role)
      : this.props.roleActions.createRole(this.state.role);

    this.handleClose();
  }

  render() {
    const viewActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div className="container">
        <div>
          {this.props.roleList.roles.map(role =>

            (<RolesView
              key={role.id}
              role={role}
              onUpdate={this.updateRole(role)}
              deleteRole={this.props.roleActions.deleteRole}
              listRoles={this.props.roleActions.listRoles}
            />)
          )}
          <div>
            <FloatingActionButton onClick={this.handleOpen} backgroundColor="#681140" style={style}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <br />
        <Dialog
          title="Create a new Document"
          actions={viewActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.edit ? (
            <DocumentEditForm
              document={this.state.document}
              onChange={this.handleChange}
            />
          ) : (
              <Roles
                style={style}
                onSetAccess={this.onSetAccess}
                role={this.state.role}
                onTitleChange={this.onTitleChange}
                onContentChange={this.onContentChange}
              />
            )}
        </Dialog>
      </div>

    );
  }
}
RoleViewContainer.propTypes = {
  roleList: PropTypes.object.isRequired,
  deleteList: PropTypes.func.isRequired,
  roleActions: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

RoleViewContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    roleList: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    roleActions: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleViewContainer);
