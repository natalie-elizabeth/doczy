import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import login from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import loginValidate from '../../utils/validateLogin';



class LoginUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
      snackBarOpen: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
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
      this.props.authActions.login({ email: this.state.email, password: this.state.password })
        .then((res) => {
          this.context.router.history.push('/documents');
          location.reload();
        })
        .catch(err => this.setState({ errors: err, isLoading: false }));
      this.setState({ snackBarOpen: true });
      this.handleClose();

    }
  }

  isValid() {
    const { errors, isValid } = loginValidate(this.state);
    if (!isValid) {
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
              <form onSubmit={this.onSubmit} className="col s12">
                <h2 className="card-heading" style={{ fontSize: "48px", fontFamily: "Roboto", fontWeight: "bold", color: "black" }}>Sign In</h2>
                {errors.summary && <p className="error-message">{errors.summary}</p>}
                <div className='row'>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i> &nbsp;&nbsp;
                    <TextField
                      floatingLabelText="email"
                      name="email"
                      errorText={errors.email}
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                  </div>
                </div>

                <br />
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
                <br />
                <div className="button-line">
                  <RaisedButton type="submit" label="Sign in" primary />
                </div>
                <Snackbar
                  open={this.state.snackBarOpen}
                  message="Login successful"
                  autoHideDuration={2000}
                  onRequestClose={this.closeSnackBar}
                />
                <CardText>Dont have an account? <Link to={'/signup'}>Register</Link></CardText>
              </form>
            </Card>
          </center>
        </MuiThemeProvider>
      </div>
    );
  }
}

LoginUser.propTypes = {
  // login: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

LoginUser.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(LoginUser);

