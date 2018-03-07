import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { signupRequest } from '../../actions/authActions';
import validateInput from '../../utils/validateSignup';



import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: '',
      role_id: 2,
      errors: {},
      isLoading: false,
      snackBarOpen: false

    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);

  };
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  closeSnackBar() {
    this.setState({ snackBarOpen: false });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      // this.setState({ errors: {}, isLoading: true });
      this.props.signupRequest((this.state))
        .then(() => {
          console.log('hey');
          this.context.router.history.push('/login');

        })
        .catch(err => {
          this.setState({ errors: err.response.data, isLoading: false });
        });
      this.setState({ snackBarOpen: true });
      this.handleClose();

    }

  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <center>
            <Card className="container">
              <form action="/" onSubmit={this.onSubmit} className="col s12">
                <h2 className="card-heading" style={{ fontFamily: "Roboto", color: "black", fontStyle: "bold", fontSize: "48px" }} >Sign Up</h2>
                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className='row'>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i> &nbsp;&nbsp;
                    <TextField
                      floatingLabelText="Username"
                      name="username"
                      errorText={errors.username}
                      onChange={this.onChange}
                      value={this.state.username}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i> &nbsp;&nbsp;
                    <TextField
                      floatingLabelText="First Name"
                      name="firstname"
                      errorText={errors.firstname}
                      onChange={this.onChange}
                      value={this.state.firstname}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i> &nbsp;&nbsp;
                    <TextField
                      floatingLabelText="Last Name"
                      name="lastname"
                      errorText={errors.lastname}
                      onChange={this.onChange}
                      value={this.state.lastname}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">email</i> &nbsp;&nbsp;
                    <TextField
                      floatingLabelText="Email"
                      name="email"
                      errorText={errors.email}
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                  </div>
                </div>

                <div className="input-field col s6">
                  <i className="material-icons prefix">lock</i> &nbsp;&nbsp;
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    errorText={errors.password}
                    value={this.state.password}
                  />
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">lock</i> &nbsp;&nbsp;
                  <TextField
                    floatingLabelText="Confirm Password"
                    type="password"
                    name="confirm"
                    onChange={this.onChange}
                    errorText={errors.confirm}
                    value={this.state.confirm}
                  />
                </div>
                <br />
                <div className="button-line">
                  <RaisedButton type="submit" label="Create New Account" primary />
                </div>
                <Snackbar
                  open={this.state.snackBarOpen}
                  message="Sign up successful"
                  autoHideDuration={2000}
                  onRequestClose={this.closeSnackBar}
                />
                <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
              </form>
            </Card>
          </center>
        </MuiThemeProvider>
      </div>
    );
  }
}

SignUp.propTypes = {
  // signupRequest: PropTypes.func.isRequired
};

SignUp.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { signupRequest })(SignUp);
