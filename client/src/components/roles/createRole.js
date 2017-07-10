import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as roleActions from '../../actions/roleActions';
import validateInput from '../../utils/validateRole';
import RoleEditForm from '../../components/roles/editRole';


class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isLoading: false,
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    console.log('this.state.role.name');
    console.log('@ here >>>>>>>>>>>', this.state);
  };

  componentDidMount() {
    this.props.listRoles();

  }
  onNameChange(event) {
    const Name = this.state.name;
    Name.name = event.target.value;
    this.setState({ name: Name });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      name: Object.assign({}, this.state.name, {
        [name]: value
      })
    });
  }
  updateRole(role) {
    return e => {
      this.setState({
        name
      });
    };
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
                      name="name"
                      errorText={errors.name}
                      onChange={this.onChange}
                      value={this.state.name}
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
                  return <Card className="container">
                    <form key={index} ><p>{role.id}&nbsp;&nbsp;{role.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

                      }>Delete</RaisedButton> </p>  <br />
                      <RaisedButton onTouchTap={() => {
                        console.log(">>>>>>>>>>>>> tell me you got here", role.id);
                        this.props.updateRole(role.id)
                          .then(() => {
                            this.props.listRoles();
                            console.log('you better work');
                          });
                      }}>Update</RaisedButton>
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
  return {
    roles: state.rolesReducer.roles,
    loading: state.rolesReducer.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(roleActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Roles);

