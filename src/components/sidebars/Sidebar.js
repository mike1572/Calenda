
import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

//Redux
import {connect} from 'react-redux';
import { logoutUser, closeMenu } from "../../redux/actions/userActions";

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress'

let Sidebar = (props) => {

  let loading = props.user.loading;
  let open = props.UI.open

  let doctor;

  if (!loading){
    const { user: { client: { type }}} = props


    if (type === 'doctor') {
      doctor = true;
    } else {
      doctor = false;
    }

  }

  let handleLogOut = () => {
    if (open){
      props.closeMenu()
    }
    props.logoutUser()
  }


  let sidebar = !loading ? (doctor? (

    <Fragment>
   
        <Tooltip component={Link} to="/home" title="See all appointments" placement='bottom' name="home" >
          <ListItem button name="home" >
            <ListItemIcon name="home">
              <DashboardIcon name="home"/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" name="home" />
          </ListItem>
        </Tooltip>

        
      <Tooltip component={Link} to="/appointment" title="Book an appointment for a patient" placement="bottom" name="book" > 
        <ListItem button name="book" >
          <ListItemIcon name="book"  >
            <AddIcon name="book" />
          </ListItemIcon>
          <ListItemText primary="Book Appointment" name="book" />
        </ListItem>
      </Tooltip>
    
      <Tooltip component={Link} to="/patients" title="All your patients" placement="bottom" name="patients" >
        <ListItem button name="patients" >
          <ListItemIcon name="patients">
            <PeopleIcon name="patients"/>
          </ListItemIcon>
          <ListItemText primary="Patients" name="patients"/>
        </ListItem>
      </Tooltip>

      <Tooltip component={Link} to="/profile" title="Edit profile" placement="bottom" name="profile" >
          <ListItem button name="profile" >
            <ListItemIcon name="profile">
              <AccountCircle name="profile"/>
            </ListItemIcon>
            <ListItemText primary="Profile" name="profile" />
          </ListItem>
      </Tooltip>
      
      <Divider/>

      <Tooltip title="Log Out" placement="bottom" onClick={handleLogOut}> 
      <ListItem button >
        <ListItemIcon >
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
      </Tooltip>

    </Fragment>

    ): (
      <Fragment>
        
        <Tooltip component={Link} to="/home" title="See all appointments" placement='bottom' name="home"  >
          <ListItem button name="home">
            <ListItemIcon name="home">
              <DashboardIcon name="home"/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" name="home"/>
          </ListItem>
        </Tooltip>
      
        <Tooltip component={Link} to="/appointment" title="Book a new appointment" placement="bottom" name="book" > 
        <ListItem button name="book" >
          <ListItemIcon name="book">
            <AddIcon name="book" />
          </ListItemIcon>
          <ListItemText primary="Book Appointment" name="book" />
        </ListItem>
        </Tooltip>

        <Tooltip component={Link} to="/professionals" title="Your professionals" placement="bottom" name="professionals" > 
          <ListItem button name="professionals" >
            <ListItemIcon name="professionals">
              <PeopleAltIcon name="professionals" />
            </ListItemIcon>
            <ListItemText primary="Your Professionals" name="professionals" />
          </ListItem>
        </Tooltip>

        <Tooltip component={Link} to="/users" title="View or add users to this account" placement="bottom" name="people" >
          <ListItem button name="people">
            <ListItemIcon name="people" >
              <GroupAddIcon name="people" />
            </ListItemIcon>
            <ListItemText primary="People" name="people" />
          </ListItem>
        </Tooltip>

        <Tooltip component={Link} to="/profile" title="Edit profile" placement="bottom" name="profile"  >
          <ListItem button name="profile" >
            <ListItemIcon name="profile"  >
              <AccountCircle name="profile" />
            </ListItemIcon>
            <ListItemText primary="Profile"  name="profile" />
          </ListItem>
        </Tooltip>
          
        <Divider/>

        <Tooltip title="Log Out" placement="bottom" onClick={handleLogOut}> 
          <ListItem button >
            <ListItemIcon >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </Tooltip>

      </Fragment>
    ) ) : 
      (
        <Fragment>
          <ListItem >
            <CircularProgress color="secondary" />
          </ListItem>
        </Fragment>
      
        )
    
    return sidebar;

}


Sidebar.propTypes = {
  closeMenu : PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user, 
  UI: state.UI
})

const mapActionsToProps = {
  logoutUser,
  closeMenu 
}


export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
