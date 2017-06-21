import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DocumentView from './documentView';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const DocumentList = ({ documents, onOpen }) => (
  <div>
    {documents.map(document =>
      <DocumentView key={document.id} document={document} />
    )}
    <div>
      <FloatingActionButton onClick={onOpen}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
);
DocumentList.PropTypes = {
  documents: PropTypes.array.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default DocumentList;
