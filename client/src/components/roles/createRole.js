import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createRole } from '../../actions/roleActions';
import validateInput from '../../utils/validateRole';


class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  };

  onChange(event) {
    thi.setState({
      [event.target.name]: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.createRole((this.state))
        .then(() => {
          console.log('crushy');
          this.context.router.history.push('/about');
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
    const { erros } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <center>
            <Card className="container">
              <form action="/" onSubmit={this.onSubmit} >
                <h2 className="card-heading">Create new Roles</h2>
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
                <br />
                <div className="button-line">
                  <RaisedButton type="submit" label="Create New Role" primary />
                </div>
              </form>
            </Card>
          </center>
        </MuiThemeProvider>

      </div >
    );
  }
}
Roles.contextTypes = {
  router: PropTypes.object.isRequired
};
export default connect(null, { createRole })(Roles);

