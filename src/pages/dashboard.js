
import React, {Fragment, useEffect} from "react";
import { useLocation } from "react-router";
import PropTypes from 'prop-types';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import UserDrawer from '../components/UserDrawer';
import CalendarTable from '../components/calendar';
//Redux
import {connect} from 'react-redux';
import {setDashboard} from '../redux/actions/userActions'

import Profile from '../components/dashboard/Profile';
import Patients from '../components/dashboard/Patients';
import Professionals from '../components/dashboard/Professionals';
import Users from '../components/dashboard/Users';
import Appointment from '../components/dashboard/Appointment';
let Dashboard = (props) =>  {

    let location = useLocation()
    location = location.pathname.substring(1, location.pathname.length)
    if (location.includes('/')){
        location = location.substring(0, location.indexOf('/'))
    }

    useEffect(()=> {        
        props.setDashboard(location)
    }, [location])

    return (
        <Fragment>                 
            <UserDrawer/>
            <CalendarTable/>
            <Profile/>
            <Appointment/>
            <Patients/>
            <Professionals/>
            <Users/>
        </Fragment>
    )

}

Dashboard.propTypes = {
    setDashboard: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    setDashboard
}

export default connect(mapStateToProps, mapActionsToProps) (Dashboard);

