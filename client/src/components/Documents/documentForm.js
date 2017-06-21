
import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';

const DocumentForm = () => (

  <div>
    <Card className="container">
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

    </Card>
  </div>
);

export default DocumentForm;
