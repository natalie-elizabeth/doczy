import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import JWTdecode from 'jwt-decode';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { getUserFromToken } from '../../utils/tokenUtils';

const styles = {
  titleStyle: {
    color: '#ffffff',
    fontFamily: 'Roboto'
  }
};

const RolesView = props => (
  <div>
    <GridList
      cellHeight="auto"
      cols={1}
    >
      {getUserFromToken().userId === props.role.user_id ?

        <IconMenu
          style={{ float: 'right' }}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            primaryText="Edit Role"
            onTouchTap={props.onUpdate}
          />
          <MenuItem
            primaryText="Delete Role"
            onTouchTap={() => {
              props.deleteRole(props.role.id)
                .then(() => {
                  props.listRoles();
                });
            }
            }
          />
        </IconMenu> : <span />
      }
      <GridTile>
        <h2 fontFamily="Roboto">{props.role.id}</h2>
        {props.role.name}
      </GridTile>
    </GridList>
  </div>
);


export default RolesView;
