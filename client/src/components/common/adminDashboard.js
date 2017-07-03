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
                    <RaisedButton label="Roles" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Link>
                <Link to="/users" className="nav-link">
                    <RaisedButton label="Users" />&nbsp;&nbsp; </Link>
                <br /><br />
            </center>
        </Card>


    </div>
);

export default dashboard;
