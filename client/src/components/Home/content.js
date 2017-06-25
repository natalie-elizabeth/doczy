import React, { Component } from 'react';
import Login from '../User/loginPage';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';
import DocumentContainer from '../Documents/documentContainer';

const content = () => (
  <div>
    <Card className="container">< DocumentContainer /> </Card>
  </div>
);
export default content;
