import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardActions, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import CreateIcon from 'material-ui/svg-icons/content/create';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import { getUserFromToken } from '../../utils/tokenUtils';
import DocumentList from '../Documents/documentList';



export class OwnProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isEditing: false,
      editedUser: {},
      user: getUserFromToken() || {}
    };
    this.editUserToggle = this.editUserToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {

  }

  editUserToggle() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleSubmit(event) {
    event.preventDefault();
    const hasErrors = Object.keys(this.state.errors).some(key => !!this.state.errors[key]);
    console.log('errors >>>>>>>>>>>>.', hasErrors);
    if (hasErrors) {
      return;
    }
    const updatedUser = Object.assign({}, this.state.editedUser, {
      id: this.props.user.id
    });
    this.props.updateUser(updatedUser);
  }
  handleChange(event) {
    event.preventDefault();
    let editedUser = this.state.editedUser;
    this.setState({
      editedUser: Object.assign({}, editedUser, {
        [event.target.name]: event.target.value
      })
    });
  }

  canEdit(user) {
    return true;
  }

  render() {
    let user = this.props.user;
    console.log('this guy---->>>>>>>>>>>>>>>', user);
    if (!user) {
      return (
        <CircularProgress />
      );
    } else {
      user = Object.assign({}, this.props.user, this.state.user);
    }
    return (
      <div className="row col-md-10 col-md-offset-1 col-sm-12" style={{ padding: 80 }}>
        <div className="col-md-4 col-sm-4" >
          {!this.state.isEditing ?
            <Card style={{ maxWidth: 350, marginTop: 30 }}>
              <CardMedia overlay={<CardTitle title={user.userName} />} />
              <CardText>
                {user.email}
              </CardText>
              {this.canEdit(user) ?
                <CardActions>
                  <FlatButton label="Edit Profile" onClick={this.editUserToggle}
                    icon={<CreateIcon />} primary />
                </CardActions> : <span />}
            </Card> :
            <Card style={{ maxWidth: 350, marginTop: 30 }}>
              <CardMedia overlay={<CardTitle title={user.userName} />} />
              <CardText>
                <TextField
                  hintText="Username"
                  floatingLabelText="Username"
                  name="userName"
                  onChange={this.handleChange}
                  defaultValue={user.userName}

                /><br />
                <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  name="email"
                  onChange={this.handleChange}
                  defaultValue={user.email}

                /><br />
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                /><br />
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  onChange={this.handleChange}
                  name="confirmPassword"
                  type="password"


                /><br />
              </CardText>
              <CardActions>
                <FlatButton label="Submit" onClick={this.handleSubmit} primary />
                <FlatButton label="Cancel" onClick={this.editUserToggle} primary />
              </CardActions>
            </Card>
          }
        </div>
        <div className="col-md-8 col-sm-8" >
          <DocumentList documents={user.documents} />

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return { user: state.user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(authActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfile);


