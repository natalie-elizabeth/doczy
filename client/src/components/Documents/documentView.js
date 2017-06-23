import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JWTDecode from 'jwt-decode';
import Header from '../common/Header';
import { getUserFromToken } from '../../utils/tokenUtils';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { GridList, GridTile } from 'material-ui/GridList';

const owner = window.localStorage.getItem('username');
console.log('this is shit');

const DocumentView = props => (
  <div>
    <GridList>
      {getUserFromToken().userid === props.document.userid ?
        <IconMenu
          style={{ float: 'right' }}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            primaryText="Edit Document"
            onTouchTap={props.onUpdate}
          />
          <MenuItem
            primaryText="Delete Document"
            onTouchTap={() => {
              props.deleteDocument(props.document.id)
                .then(() => {
                  props.listDocuments();
                  console.log('here?');
                });
            }
            }
          />
        </IconMenu> : <span />
      }
      <GridTile
        title={props.document.title}
      >
        <h5>{props.document.title}</h5>
        {props.document.content}
      </GridTile>
    </GridList>
  </div>
);
Document.propTypes = {
  dispatch: PropTypes.func.isRequired,
  documents: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default DocumentView;
