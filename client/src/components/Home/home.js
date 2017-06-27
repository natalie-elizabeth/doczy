import React, { Component } from 'react';
import Login from '../User/loginPage';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';

const Home = () => (
  <div>
    <Card className="container">
      <center><CardTitle title="Doczy" subtitle="All your documents in one place" /></center>
    </Card>
    <br /><br />
  </div>
);
export default Home;
