import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentForm from './documentForm';
import * as docActions from '../../actions/docActions';
import { Link, BrowserRouter } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DocumentView from './documentView';
import DocumentList from './documentList';
import ContentAdd from 'material-ui/svg-icons/content/add';

class documentContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: {
        title: '',
        content: '',
        access: '',
        userid: ''
      },
      open: false
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
  };


  componentWillMount() {
    this.props.docActions.listDocuments();
  }

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
  }

  onSetAccess(event, index, value) {
    const Document = this.state.document;
    Document.access = value;
    this.setState({ document: Document });
  }

  onChangeTitle(event) {
    const Document = this.state.document;
    Document.title = event.target.value;
    this.setState({ document: Document });
  }

  onChangeContent(event) {
    const Document = this.state.document;
    Document.content = event.target.value;
    this.setState({ document: Document });
  }

  updateDocument(document) {
    documentsUpdateRequest(document);
    this.context.router.history.push('/edit');
  }



  render() {
    const formActions = [
      <FlatButton label='Cancel' primary onTouchTap={this.onClose} />,
      <FlatButton
        label='Submit' primary
        keyboardFocused
        onTouchTap={(event) => {
          event.preventDefault();
          this.props.docActions.createDocument(this.state.document);
          this.onClose();
        }}
      />,
    ];
    return (
      <div>
        <div>
          {this.props.documentList.documents.map(document =>
            (<DocumentView
              key={document.id}
              document={document}
              onUpdate={this.props.docActions.updateDocument}
              deleteDocument={this.props.docActions.deleteDocument}
              listDocuments={this.props.docActions.listDocuments} />
            ))}
          <div>
            <FloatingActionButton onClick={this.onOpen} > <ContentAdd /> </FloatingActionButton>
          </div>
        </div>
        <br />

        <Dialog
          title="New Document"
          actions={viewActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.onClose}
        >
          <CreateDocument
            onSetAccess={this.onSetAccess}
            document={this.state.document}
            onChangeTitle={this.onChangeTitle}
            onChangeContent={this.onChangeContent} />
        </Dialog>

      </div>
    );
  }
}

documentContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    documentList: state.documents
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    docActions: bindActionCreators(docActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(documentContainer);
