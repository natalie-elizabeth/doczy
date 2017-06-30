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
import * as authActions from '../../actions/authActions';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
  }
  componentDidMount() {
    this.props.listRoles();
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    const { errors } = this.state;
    let users = this.props.users;
    let loading = this.props.loading;
    return (
      <div>
{users.map(user, index)}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    users: state.userReducer.roles,
    loading: state.userReducer.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActions, dispatch);
}
export default UserList;
