import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <Card className="container">
      <center><CardTitle title="Doczy" subtitle="All your documents in one place" />
      </center>
    </Card>
    <br /><br />

  </div>
);
export default Home;
