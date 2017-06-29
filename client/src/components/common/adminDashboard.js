import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const dashboard = () => (
  <div>
    <Card className="container">
      <center><CardTitle title="Doczy" subtitle="All your documents in one place" />
        <Link to="/roles" className="nav-link">
          <RaisedButton label="Create new roles" />&nbsp;&nbsp; </Link>
        <Link to="/users" className="nav-link">
          <RaisedButton label="View all users" />&nbsp;&nbsp; </Link>
          <Link to="/role-page" className="nav-link">
          <RaisedButton label="View roles" />&nbsp;&nbsp; </Link>
      </center>
    </Card>
    <br /><br />

  </div>
);
export default dashboard;
