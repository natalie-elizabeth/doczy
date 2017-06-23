import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import DocumentView from './documentView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';

const DocumentForm = props => (
  <div>
    <MuiThemeProvider>
      <Card >
        <TextField
          type="text"
          name="title"
          placeholder="Document Title"
          defaultValue={props.document.title}
          onChange={props.onTitleChange}
          fullWidth
        />
        <br />
        <TextField
          type="text"
          name="content"
          placeholder="Write your document"
          defaultValue={props.document.content}
          onChange={props.onContentChange}
          multiLine
          fullWidth
        />
        <br />
        <SelectField
          floatingLabelText="Access"
          value={props.document.access}
          onChange={props.onSetAccess}
        >
          <MenuItem value={'public'} primaryText="Public" />
          <MenuItem value={'private'} primaryText="Private" />

        </SelectField>
      </Card>
    </MuiThemeProvider>
  </div>
);


export default DocumentForm;
