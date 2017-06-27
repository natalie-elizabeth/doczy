import React from 'react';
import { Link } from 'react-router-dom';

class LoggedInView extends React.Component{
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    window.localStorage.removeItem('token');
    // dispatch(logoutUser());
  };

  render() {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Document
          </Link>
        </li>

        <li className="nav-item">
          <Link to="settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <button to="settings" className="nav-link" onClick={this.logout()}>
            <i className="ion-gear-a"></i>&nbsp;Logout
        </button>
        </li>

      </ul>
    );
  }
};

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
    let token = window.localStorage.getItem('token');
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName}
          </Link>
          {
            token ? <LoggedInView currentUser={this.props.currentUser} /> : <LoggedOutView currentUser={this.props.currentUser} />
          }




        </div>
      </nav>
    );
  }
}

export default Header;
