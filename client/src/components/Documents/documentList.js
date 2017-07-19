import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DocumentView from './documentView';
import { Card, CardText } from 'material-ui/Card';

const DocumentList = ({ documents, handleOpen, style }) => (
  <div>
    <Card>
      <div style={{ fontFamily: "Roboto", fontSize: "15px" }}> {documents.map(document =>
        <DocumentView key={document.id} document={document} />
      )}</div>
    </Card>
    <div>
      <FloatingActionButton onClick={handleOpen} style={style}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div >
);
DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  handleOpen: PropTypes.func.isRequired,
  style: PropTypes.func.isRequired
};

export default DocumentList;
