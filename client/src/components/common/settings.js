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
import * as userActions from '../../actions/authActions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        errors: {}
      }

    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }
  onUsernameChange(e) {
    const User = this.state.user;
    User.username = e.target.value;
    this.setState({ user: User });
  }
  onEmailChange(e) {
    const User = this.state.user;
    User.email = e.target.value;
    this.setState({ user: User });
  }
  onPasswordChange(e) {
    const User = this.state.user;
    Document.password = e.target.value;
    this.setState({ user: User });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      user: Object.assign({}, this.state.user, {
        [name]: value
      })
    });
  }
  updateUser(user) {
    return e => {
      this.setState({
        user,
        edit: true
      });
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.edit) {
      this.props.userActions.updateDocument(this.state.document);
    }
  }
  render() {
    const { errors } = this.state;
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
