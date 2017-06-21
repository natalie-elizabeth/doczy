
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class DocumentForm extends Component {
  render() {
    return (
      <div>
        <form>
          <TextField
            type="text"
            name="title"
            placeholder="Document Title"
            defaultValue={this.props.title}
            onChange={this.props.onChange}
            fullWidth
          />
          <br />
          <TextField
            type="text"
            name="content"
            placeholder="Write your document"
            defaultValue={this.props.content}
            onChange={this.props.onChange}
            multiLine
            fullWidth
          />
          <TextField
            type="text"
            name="userId"
            placeholder="userId"
            defaultValue={this.props.userId}
            onChange={this.props.onChange}
            multiLine
            fullWidth
          />
          <br />
          <TextField
            type="text"
            name="access"
            label="Access"
            defaultValue={this.props.access}
            onChange={this.props.onChange}
            fullWidth
          />
          <br />
          <RaisedButton
            primary
            style={style}
            type="submit"
            label="Create Document"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSubmit}
          />
        </form>

      </div >
    );
  }
}
export default DocumentForm;
