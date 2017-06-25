import React, { Component } from 'react';
import Login from '../User/loginPage';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';
import DocumentContainer from '../Documents/documentContainer';

const Home = () => (
  <div>
    <Card className="container">
      <center><CardTitle title="Doczy" subtitle="All your documents in one place" style={{}}/></center>
    </Card>
    <br /><br />
    <Card className="container">< DocumentContainer /> </Card>
  </div>
);
export default Home;
