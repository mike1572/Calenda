
import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';

//MUI
import Menu from  '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

//Icons
import NotificationsIcon from '@mui/icons-material/Notifications';

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
//Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

let Notifications = (props) => {

    dayjs.extend(LocalizedFormat)

    const [anchorEl, setAnchorEl] = useState(null)
    const notifications = props.notifications;

    let handleOpen = (event) => {
        setAnchorEl(event.target)
    }

    let handleClose = () => {
        setAnchorEl(null)
    }

    let onMenuOpened = () => {
        let unreadNotificationsIds = props.notifications.filter(not => !not.read).map(not => not.notificationId);
        props.markNotificationsRead(unreadNotificationsIds);
    }

    let notificationIcon;
    if (notifications && notifications.length > 0){
        notifications.filter(not => not.read === false).length > 0 
        ? notificationIcon = (
            <Badge badgeContent={notifications.filter(not => not.read === false).length} color="secondary">
                <NotificationsIcon/>
            </Badge>
        ): (
            notificationIcon = <NotificationsIcon/>
        )
    } else {
        notificationIcon = <NotificationsIcon/>
    }

    let notificationsMarkup = notifications && notifications.length > 0 ? (
        notifications.map(not => {
            let verb;
            let icon;
            let path
            
            const iconColor = not.read ? 'primary' : 'secondary';
           
            if (not.type === 'doctor'){
                verb = `Thanks for joining Calenda. Please start by adding your working times so your clients know your availabilities.`
                icon = (<SentimentVerySatisfiedIcon color={iconColor} style={{ marginRight: 10 }}/>)
                path= '/profile'
            } else if (not.type === 'patient'){
                verb = `Thanks for joining Calenda. Please start by adding a professional on your list to simplify the booking process.`
                icon = (<SentimentVerySatisfiedIcon color={iconColor} style={{ marginRight: 10 }}/>)
                path= '/professionals'
            } else if (not.type === 'appointment'){
                verb = `You have a new appointment on ${dayjs(not.start).format('llll')}.`
                icon = (<CheckIcon color={iconColor} style={{ marginRight: 10 }}/>)
                path='/home'
            } else if (not.type === 'cancel') {
                verb = `Your appointment on ${dayjs(not.start).format('llll')} was cancelled.`
                icon = (<CancelOutlinedIcon color={iconColor} style={{ marginRight: 10 }}/>)
                path='/home'
            }
                        
            return (
                <MenuItem key={not.createdAt} onClick={handleClose}>
                    {icon}
                    <Typography component={Link} to={path} color="default" variant="body1" >
                        {verb}            
                    </Typography>
                </MenuItem>
            )

        })
    ) : (
        <MenuItem onClick={handleClose}>
            You have no new notifications
        </MenuItem>
    )

    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu': undefined} aria-haspopup="true" 
                    onClick={handleOpen}>
                        {notificationIcon}
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}  onClick={onMenuOpened}>
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
    
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired, 
    notifications: PropTypes.array.isRequired
}

let mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);









