import React, {Fragment} from "react";
import PropTypes from 'prop-types';

//Redux
import {connect} from 'react-redux';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress'

import {convertAppointment} from '../ressources/useful';
import DialogBox from './DialogBox';
import { setAppointmentId } from '../redux/actions/userActions';

let locales = {
    'en-US': require('date-fns/locale/en-US')
}

let localizer = dateFnsLocalizer({
    format, parse, startOfWeek, getDay, locales
})


let CalendarTable = (props) => {

    let events = []

    let {UI: {dashboard}} = props;
    
    let loading = props.user.loading;
    let {user} = props
    let calendar;
    
    let handleCalendarClick = (event) => {
        props.setAppointmentId(event.id)
    }

    let eventStyleGetter = (event, start, end, isSelected) => {
        
        let backgroundColor = '#ccffff';

        let style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.9,
            color: 'black'
        }  
        return {
            style: style
        }
    }


    let loadCalendar = () => {
        
        user.appointments.forEach(element => {
            events.push(convertAppointment(element, user.client.type))
        })
        
        calendar = (
            <Box sx={{overflow: 'auto', flexGrow: 1, height: '100vh', position: 'relative', mt: 7}} >
            <DialogBox/>
            <Calendar localizer={localizer} events={events} 
                step={30}
                className="pointA"
                onSelectEvent={handleCalendarClick}
                startAccessor="start" endAccessor="end" 
                eventPropGetter={eventStyleGetter}
                style={{height: 600 , margin: 'auto', width: '90%', color: 'red'}}
            />
            </Box>

        )
        
    }


    if (!loading ) {

        loadCalendar()
 
    } else {
        calendar = (

            <div style={{margin: 'auto'}}>
                <CircularProgress color="secondary" size={200} thickness={1} sx={{overflow: 'auto', position: 'relative', m: 7}} />
            </div>
     
        )
    }

    if (dashboard === 'home'){
        
        return calendar;
     
    }

    return (
        <Fragment></Fragment>
    )
    
}


CalendarTable.propTypes = {
    setAppointmentId: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user, 
    UI: state.UI
})

const mapActionsToProps = {
    setAppointmentId
}


export default connect(mapStateToProps, mapActionsToProps)(CalendarTable);



