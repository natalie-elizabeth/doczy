import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';
import RaisedButton from 'material-ui/RaisedButton';

const Home = () => (
  <div>
    <Card className="container">
      <center><CardTitle title="Doczy" subtitle="All your documents in one place" /></center>
    </Card>
    <br /><br />
    <nav className="container">
      <center><RaisedButton label="View all users"></RaisedButton></center>
      <center><RaisedButton label="Create new roles"></RaisedButton></center>
      <center><RaisedButton label="Delete Users users"></RaisedButton></center>
    </nav>
  </div>
);
export default Home;
