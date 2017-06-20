import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { signupRequest } from '../../actions/authActions';

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
      role_id: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  };
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then((res) => {
        this.context.router.push('/Header');
      })
        .catch(err => this.setState({ errors: err, isLoading: false }));
    }

  }
  isValid() {
    const { errors, isValid } = loginValidate(this.state);
    if (isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors, email, password, isLoading } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <center>
            <Card className="container">
              <form action="/" onSubmit={this.onSubmit} className="col s12">
                <h2 className="card-heading">Sign Up</h2>
                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className='row'>
                  <div className="input-field col s6">
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
                    <TextField
                      floatingLabelText="Email"
                      name="email"
                      errorText={errors.email}
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                  </div>
                </div>

                <br />
                <div className="input-field col s6">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    errorText={errors.password}
                    value={this.state.password}
                  />
                </div>
                <br />
                <div className="button-line">
                  <RaisedButton type="submit" label="Create New Account" primary />
                </div>
                <CardText>Already have an account? <Link to={'/'}>Log in</Link></CardText>
              </form>
            </Card>
          </center>
        </MuiThemeProvider>
      </div>
    );
  }
}

SignUp.propTypes = {
  signupRequest: PropTypes.func.isRequired
};
SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { signupRequest })(SignUp);
