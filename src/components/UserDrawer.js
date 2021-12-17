
import React from 'react'
import PropTypes from 'prop-types';
// Redux
import {connect} from 'react-redux';
import { closeMenu } from "../redux/actions/userActions";

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import Sidebar from '../components/sidebars/Sidebar';

const Draw = styled(Drawer, { 
        shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(79),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

let UserDrawer = (props) => {

    let { open } = props;

    let handleOpen = () => {
      if (open) {
          props.closeMenu()
      }

    }

    return (

        <Draw variant="permanent" open={open} sx={{mt: -7}} >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleOpen} >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
            <Sidebar/>
        </List>

      </Draw>
    )
}


UserDrawer.propTypes = {
    open: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    open: state.UI.open
})

const mapActionsToProps = {
    closeMenu
}

export default connect(mapStateToProps, mapActionsToProps)(UserDrawer);

