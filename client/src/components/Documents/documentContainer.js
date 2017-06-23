import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as documentActions from '../../actions/docActions';
import DocumentView from './documentView';
import DocumentList from './documentList';
import DocumentForm from './documentForm';


// const style = {
//   position: 'fixed',
//   top: 20,
//   right: 20,
//   marginRight: 20,
// };

class DocumentContainer extends React.Component {
  debugger;
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      document: {
        title: '',
        content: '',
        access: ''
      }
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  componentWillMount() {
    this.props.documentActions.listDocuments();
  }
  onSetAccess(event, index, value) {
    const Document = this.state.document;
    Document.access = value;
    this.setState({ document: Document });
  }
  onTitleChange(event) {
    const Document = this.state.document;
    Document.title = event.target.value;
    this.setState({ document: Document });
  }
  onContentChange(event) {
    const Document = this.state.document;
    Document.content = event.target.value;
    this.setState({ document: Document });
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  updateDocument(document) {
    documentsUpdateRequest(document);
    this.context.router.history.push('/edit');
  }

  render() {
    const viewActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={(e) => {
          e.preventDefault();
          this.props.documentActions.createDocument(this.state.document);
          console.log("documents", this.props.listDocuments());
          this.handleClose();
        }}
      />,
    ];
    // console.log("props", this.props.documentActions.listDocuments());
    return (
      <div className="container">
        <div>
          {this.props.documentList.documents.map(document =>
            (<DocumentView
              key={document.id}
              document={document}
              onUpdate={this.props.documentActions.updateDocument}
              deleteDocument={this.props.documentActions.deleteDocument}
              listDocuments={this.props.documentActions.listDocuments}
            />)
          )}
          <div>
            <FloatingActionButton onClick={this.handleOpen} backgroundColor="#681039" >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <br />
        <Dialog
          title="Create a new document"
          backgroundColor="#681039"
          actions={viewActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <DocumentForm
            onSetAccess={this.onSetAccess}
            document={this.state.document}
            onTitleChange={this.onTitleChange}
            onContentChange={this.onContentChange}
          />

        </Dialog>
      </div >
    );
  }
}
console.log('did you get here?');
DocumentContainer.propTypes = {
  documentList: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  listDocuments: PropTypes.func.isRequired,
  documentActions: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};


DocumentContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    documentList: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    documentActions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);


