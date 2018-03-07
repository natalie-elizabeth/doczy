
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import * as documentActions from '../../actions/docActions';
import DocumentView from './documentView';
import DocumentList from './documentList';
import CreateDocument from './CreateForm';
import DocumentEditForm from './editDocument';
import Pagination from 'react-js-pagination';
import DocumentSearch from './documentSearch';

import * as tokenUtils from '../../utils/tokenUtils';

const style = {
  position: 'fixed',
  top: 70,
  right: 20,
  marginRight: 30,
};

export class DocumentViewContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      activePage: 1,
      limit: 3,
      offset: 0,
      document: {
        title: '',
        content: '',
        access: '',
        snackBarOpen: false

      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }
  componentWillMount() {
    this.props.documentActions.listDocuments(this.state.limit, this.state.offset);
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
    this.setState({ open: true, document: {} });
  }

  handleClose() {
    this.setState({ open: false, edit: false });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      document: Object.assign({}, this.state.document, {
        [name]: value
      })
    });
  }
  closeSnackBar() {
    this.setState({ snackBarOpen: false });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.documentActions.listDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }

  updateDocument(document) {
    return event => {
      this.setState({
        document,
        edit: true,
        open: true,
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.edit
      ? this.props.documentActions.updateDocument(this.state.document)
      : this.props.documentActions.createDocument(this.state.document);
    this.setState({ snackBarOpen: true });
    this.handleClose();

  }

  render() {
    const viewActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
        className="waves-effect waves-light btn"
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      < div className="container" >

        <div>
          <div style={{ marginLeft: '30px' }}> <DocumentSearch /> </div>
          <hr />
          {this.props.documentList.documents && this.props.documentList.documents.length ? (this.props.documentList.documents.map(document =>
            (<DocumentView
              key={document.id}
              document={document}
              onUpdate={this.updateDocument(document)}
              deleteDocument={this.props.documentActions.deleteDocument}
              listDocuments={this.props.documentActions.listDocuments}


            />)
          )) : <p style={{ fontSize: "20px" }}>No Documents Available</p>}
          <div className="paginitaion" >
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.limit}
              totalItemsCount={10}
              pageRangeDisplayed={3}
              onChange={this.handlePageChange}
            />
          </div>

          <div>
            <FloatingActionButton onClick={this.handleOpen} backgroundColor="#681140" style={style}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <br />
        <Dialog
          title="Create a new Document"
          actions={viewActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.edit ? (
            <DocumentEditForm
              document={this.state.document}
              onChange={this.handleChange}
            />
          ) : (
              <CreateDocument
                style={style}
                onSetAccess={this.onSetAccess}
                document={this.state.document}
                onTitleChange={this.onTitleChange}
                onContentChange={this.onContentChange}
              />
            )}
        </Dialog>
        <Snackbar
          open={this.state.snackBarOpen}
          message="Document Saved"
          autoHideDuration={2000}
          onRequestClose={this.closeSnackBar}
        />
    </div >

    );
  }
}
DocumentViewContainer.propTypes = {
  documentList: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  documentActions: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

DocumentViewContainer.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewContainer);
