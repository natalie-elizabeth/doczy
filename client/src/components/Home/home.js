import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DocumentList from '../Documents/documentList';
import RaisedButton from 'material-ui/RaisedButton';

const Home = () => (
    <div>
        <Card className="container">
            <center><CardTitle title="Doczy" subtitle="All your documents in one place" />
                <RaisedButton label="View all users" />&nbsp;&nbsp;
                <RaisedButton label="Create new roles" />
                <RaisedButton label="Delete Users users" />
            </center>
        </Card>
        <br /><br />

    </div>
);
export default Home;
