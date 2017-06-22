import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectButton from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DocumentView from './documentView';

const DocumentForm = props => (
  <div>
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
  </div>
);


export default DocumentForm;
