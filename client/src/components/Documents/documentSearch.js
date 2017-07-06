import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docActions';


class DocumentSearch extends React.Component {
  constructor(props, context) {
    super(props);
    this.searchDocument = this.searchDocument.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  searchDocument(searchFilter) {
    this.props.actions.searchDocument(searchFilter);
  }
  handleSearchInput(e) {
    this.setState({ searchFilter: e.target.value });

  }

  onSubmit(e) {
    e.preventDefault();
    this.searchDocument(this.state.searchFilter);
  }
  render() {
    return (
      <div className="search-wrapper card" style={{ marginLeft: '80%' }}>
        <input
          id="search"
          onChange={this.handleSearchInput}
        />
        <i className="material-icons" onClick={(this.onSubmit)} >search</i>
      </div>

    );
  }
}
DocumentSearch.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(docActions, dispatch)
});
export default connect(null, mapDispatchToProps)(DocumentSearch);
