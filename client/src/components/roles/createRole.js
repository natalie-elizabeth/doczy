import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as roleActions from '../../actions/roleActions';
import validateInput from '../../utils/validateRole';
import RoleEditForm from '../../components/roles/editRole';


const style = {

  marginTop: 30,
  paddingTop: 40
};

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      role_name: '',
      isLoading: false,
      errors: {},
      edittingRoleId: false,
      newRoleValue: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editRole = this.editRole.bind(this);
    this.handleChange = this.handleChange.bind(this);

    console.log('this.state.role.name');
    console.log('@ here >>>>>>>>>>>', this.state);
  };

  componentDidMount() {
    this.props.listRoles();
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.createRole((this.state))
        .then(() => {
          console.log('crushy');
          this.context.router.history.push('/roles');
          console.log('are you here yet?');
        })
        .catch(err => {
          this.setState({ errors: err, isLoading: false });

        });
    }
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  // update
  onRoleNameChange(event) {
    const Role = this.state.role_name;
    console.log('>>>>>', Role);
    Role.role_name = e.target.value;
    this.setState({ role_name: Role });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      role_name: Object.assign({}, this.state.role_name, {
        [name]: value
      })
    });
  }

  updateRole(role_name) {
    return e => {
      this.setState({
        role_name
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.edit
      ? this.props.updateRole(this.state.role_name)
      : this.props.createRole(this.state.role_name);
  }

  editRole(index, event) {
    this.setState({ edittingRoleId: index });
    console.log('Index>>>', index);
  }

  handleChange() {
    let newValue = this.refs.roleName.value;
    console.log('New Value>>>>>', newValue);
    this.setState({ newRoleValue: newValue });
  }

  render() {
    const { errors } = this.state;
    let roles = this.props.roles;
    let loading = this.props.loading;

    return (
      <div>

        <MuiThemeProvider>
          <center>
            <Card className="container" expanded initiallyExpanded>
              <form action="/" onSubmit={this.onSubmit} >
                <h2 className="card-heading">Create new Roles</h2>
                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className='row'>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i> &nbsp;&nbsp;
                    <TextField
                      floatingLabelText="Role Name"
                      name="role_name"
                      errorText={errors.role_name}
                      onChange={this.onChange}
                      value={this.state.role_name}
                    />
                  </div>
                </div>
                <br />
                <div className="button-line">
                  <RaisedButton type="submit" label="Create New Role" primary />
                </div>
              </form>
              <br /><br /><br />
            </Card>
            <br /><br /><hr />

            {
              loading ? <CircularProgress thickness={4} /> :
                roles.map((role, index) => {
                  let roleName = role.role_name;
                  return <Card className="container">
                    <form key={index} >
                      <p>{role.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        {this.state.edittingRoleId === index && role.role_name !== 'admin' ? <input type="text" defaultValue={roleName} ref="roleName" onChange={this.handleChange} /> : <span onClick={(event) => this.editRole(index, event)}>{role.role_name}</span>}

                        <RaisedButton onTouchTap={() => {
                          {/*{ console.log('is this working?>>>>', role.id); }*/ }
                          if (confirm("Are you sure you want to delete this role?") === true) {
                            this.props.deleteRole(role.id)
                              .then(() => {
                                this.props.listRoles();
                                console.log('Role Deleted');
                              });
                            alert("Role deleted");
                          }
                          else {
                            alert("Role not deleted");
                          }
                        }

                        } style={{ style }}>Delete</RaisedButton>
                        <RaisedButton onTouchTap={() => {
                          console.log('things change');
                          console.log(">>>>>>>>>>>>> tell me you got here", role.id);
                          console.log('>>>>>>>>>>>>>>>>>>>>', this.props.updateRole());
                          this.state.edittingRoleId = index;
                          console.log(this.state.edittingRoleId);
                          this.props.updateRole(role.id)
                            .then(() => {
                              this.props.listRoles();
                              console.log('you better work');
                            });

                        }}>Update</RaisedButton> </p>  <br />
                    </form>
                  </Card>;
                })
            }

          </center>
        </MuiThemeProvider>

      </div >
    );
  }
}
Roles.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {

  console.log(`ROLES WAS SET TO ${state.rolesReducer.roles}`);
  return {
    roles: state.rolesReducer.roles,
    loading: state.rolesReducer.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(roleActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Roles);

