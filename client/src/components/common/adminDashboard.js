import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const dashboard = () => (
  <div>
    <br /><br /><br /><br /><br /><br /><br />
    <Card className="container" style={{ paddingTop: "7em", paddingBottom: "9em" }}>
      <center ><h1 style={{ fontSize: "48px", fontFamily: "Roboto", fontWeight: "bold", color: "black" }}>DOCZY</h1>
        <p style={{ fontSize: "22px", fontFamily: "Roboto", fontStyle: "italic", color: "#681039" }}>all your documents in one place</p>
        <Link to="/roles" className="nav-link">
          <RaisedButton label="Roles" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Link>
        <Link to="/users" className="nav-link">
          <RaisedButton label="Users" />&nbsp;&nbsp; </Link>
        <br /><br />
      </center>
    </Card>


  </div>
);

export default dashboard;
