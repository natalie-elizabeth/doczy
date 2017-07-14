import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
      role_id: 2,
      documents: {},
      errors: {},
      isLoading: false
    };
  }
  componentDidMount() {
    this.props.listUsers();
    console.log('Nnana>>>>>> ', this.props);
  }

  render() {
    const { errors } = this.state;
    let users = this.props.users;
    let loading = this.props.loading;
    // console.log('things ', users, loading);
    return (
      <div>
        <MuiThemeProvider>
          <Card className="container" expanded initiallyExpanded>
            <center><h2 className="card-heading" style={{ fontWeight: 'bold' }}>Existing Users</h2></center><br /><br />
            {
              loading ? <CircularProgress thickness={4} /> :
                users.map((user, index) => {
                  return <form key={index} ><p>{user.id}&nbsp;&nbsp;
                    <span style={{ color: '#681140', fontWeight: 'bold', fontFamily: 'Roboto', cursor: 'pointer', paddingRight: '3em', marginTop: '10px', fontSize: '20px' }}>
                      {user.username}</span>
                    <span style={{ fontStyle: 'italic', color: '#681140', fontFamily: 'Roboto', cursor: 'pointer', paddingRight: '10em', marginTop: '10px', fontSize: '15px' }}>
                      <li>{user.email}</li></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{ color: '#681140', fontFamily: 'Roboto', cursor: 'pointer', paddingRight: '10em', marginTop: '10px', fontSize: '15px' }}>
                      {user.role_id}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <RaisedButton secondary={true} onTouchTap={() => {
                      { console.log('is this working?>>>>', user.id); }
                      this.props.deleteUser(user.id)
                        .then(() => {
                          { this.props.listUsers(); }
                          console.log('Role Deleted');
                        });
                    }
                    } style={{ alignItems: "left" }}>Delete</RaisedButton> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RaisedButton primary={true} onTouchTap={() => {
                      { console.log('is this working?>>>>', user.id); }
                      if (confirm("Are you sure you want to delete this role?") === true) {
                        this.props.deleteUser(user.id)
                          .then(() => {
                            { this.props.listUsers(); }
                            console.log('Role Deleted');
                          });
                        alert('User has been deleted from the system');
                      }
                      else {
                        alert("User not deleted");
                      }
                    }
                    }>Update</RaisedButton>

                  </p>  <br /></form>;
                  <Grid>
                    <Row is="nospace start">
                      <Cell is="9 tablet-6 phone-3">
                        <TextField />
                      </Cell>
                      <Cell is="middle 3 tablet-2 phone-1">
                        <RaisedButton />
                      </Cell>
                    </Row>
                  </Grid>;

                })
            }
          </Card>
        </MuiThemeProvider>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    users: state.userReducer.users,
    loading: state.userReducer.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
