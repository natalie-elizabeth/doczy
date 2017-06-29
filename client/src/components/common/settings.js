import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { updateUser } from '../../actions/authActions';
import validateInput from '../../utils/validateUpdate';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
      this.props.updateUser((this.state))
        .then(() => {
          console.log('hey');
          this.context.router.history.push('/');

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
    return (
      <div>
        <MuiThemeProvider>
          <center>
            <Card className="container">
              <form onSubmit={this.onSubmit}>
                <h2 className="card-heading">Change your details</h2>
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
                      floatingLabelText="Email"
                      name="email"
                      errorText={errors.email}
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                  </div>
                </div>

                <div className="input-field col s6">
                  <TextField
                    floatingLabelText="New Password"
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    errorText={errors.password}
                    value={this.state.password}
                  />
                </div>
                <div className="input-field col s6">

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
                  <RaisedButton type="submit" label="Update your settings" primary />
                </div>
              </form>
            </Card>
          </center>
        </MuiThemeProvider>
      </div>
    );
  }
}
Settings.propTypes = {
  signupRequest: PropTypes.func.isRequired
};

Settings.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { updateUser })(Settings);
