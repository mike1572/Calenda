
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import {styled} from '@mui/material';
// MUI
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Notifications from "./Notifications";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

//Redux
import {connect} from 'react-redux'
import { openMenu } from "../../redux/actions/userActions";

const AppBarr = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 240,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

let NavBar = (props) => {
  
    const { authenticated, open } = props;

    let handleOpen = () => {
       props.openMenu()
    }

    return (
        <AppBarr position="absolute" open={open} >
            
                {authenticated ? (
                   
                    <Toolbar
                        sx={{
                        pr: '24px', // keep right padding when drawer closed
                        }}
                        
                    >
                    
                        <IconButton
                            edge="start"
                            aria-label="open drawer"
                            onClick={handleOpen}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                            >
                            <MenuIcon />

                        </IconButton>
                        <Typography
                            component="h1"
                            noWrap
                            fontStyle='oblique'
                            
                            gutterBottom
                            fontSize={23}
                            fontStyle='oblique'
                            fontWeight="bold"
                            sx={{ flexGrow: 1, mt: 1 }}
                            >
                            Calenda
                        </Typography>
                        <Notifications/>
                        
                    </Toolbar>
                   
                ): (

                    <Toolbar className="nav-container">
                    <Fragment>
                        <Button color="inherit" component={Link} to='/'>Home</Button>
                        <Button color="inherit" component={Link} to='/login'>Log In</Button>
                        <Button color="inherit" component={Link} to='/patient'>Patient</Button>
                        <Button color="inherit" component={Link} to='/professional'>Professional</Button>
                    </Fragment>
                    </Toolbar>
                )}
   
        </AppBarr>
     
    )
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    open: state.UI.open
})

const mapActionsToProps = {
    openMenu
}


export default connect(mapStateToProps, mapActionsToProps)(NavBar);
