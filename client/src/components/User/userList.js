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
            errors: {},
            isLoading: false
        };
    }
    componentDidMount() {
        this.props.listUsers();
        // console.log('Nnana>>>>>> ', this.props);
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
                        <h2 className="card-heading">Existing Users</h2>
                        {
                            loading ? <CircularProgress thickness={4} /> :
                                users.map((user, index) => {
                                    return <form key={index} ><p>{user.id}&nbsp;&nbsp;{user.username}{user.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <RaisedButton onTouchTap={() => {
                                            { console.log('is this working?>>>>', user.id); }
                                            this.props.deleteUser(user.id)
                                                .then(() => {
                                                    { this.props.listUsers(); }
                                                    console.log('Role Deleted');
                                                });
                                        }
                                        }>Delete</RaisedButton></p>  <br /></form>;

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
