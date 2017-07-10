import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as roleActions from '../../actions/roleActions';
import * as tokenUtils from '../../utils/tokenUtils';
import jwtDecode from 'jwt-decode';


class LoggedInView extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    window.localStorage.removeItem('token');
    this.context.router.history.push('/');

  };

  render() {
    let dashboard;
    const roleId = this.props.roleId;


    if (roleId === 1) {
      dashboard = (
        <li className="nav-item">
          <Link to="dashboard" className="nav-link">
            <i className="ion-compose"></i>&nbsp;Dashboard
          </Link>
        </li>
      );
    }
    else {
      dashboard = '';
    };

    return (
      < ul className="nav navbar-nav pull-xs-right" >

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="documents" className="nav-link">
            <i className="ion-compose"></i>&nbsp;Documents
          </Link>
        </li>

        {dashboard}

        <li className="nav-item">
          <Link to="settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>


        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={this.logout}>
            <button> <i className="ion-gear-a"></i>&nbsp;Logout </button>
          </Link>
        </li>

      </ul >
    );
  }
}

const LoggedOutView = props => {
  return (
    <div className="card-header danger-color-dark ">
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    </div>
  );
};

class Header extends React.Component {
  render() {
    let token = tokenUtils.getAuthToken();
    let decode = jwtDecode(token);
    console.log(decode.roleId);
    console.log('Token>>>>>>>>>>>>>', token);

    return (
      <nav className="navbar navbar-inverse">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName}
          </Link>
          {
            token ? <LoggedInView currentUser={this.props.currentUser} roleId={decode.roleId} /> : <LoggedOutView currentUser={this.props.currentUser} />
          }

        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    roles: state.rolesReducer.roles,
    loading: state.rolesReducer.loading
  };
}

export default connect(mapStateToProps)(Header);
