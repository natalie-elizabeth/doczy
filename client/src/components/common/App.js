
import Header from './Header';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../../actions/actionTypes';


const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  username: state.common.username,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class HeaderApp extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    // if (token) {
    //   agent.setToken(token);
    // }

    // this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            username={this.props.username} />
          {this.props.children}
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          username={this.props.username} />
      </div>
    );
  }
}

HeaderApp.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderApp);
