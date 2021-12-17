
import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

//Redux
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {closeCalendarApp, getDoctorAvailabilities, openCalendarDialog} from '../../redux/actions/userActions'
import AddIcon from '@mui/icons-material/Add';
import AddAppointmentDoctor from './AddAppointmentDoctor'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import DialogAddApp from './DialogAddApp';

let locales = {
    'en-US': require('date-fns/locale/en-US')
}

let localizer = dateFnsLocalizer({
    format, parse, startOfWeek, getDay, locales
})

let Appointment = (props) => {

    const [selected, setSelected] = useState('')
    const [fullName, setFullName] = useState('');
    const {user: {client, allDoctors, loading, users, availableTimeSlots} } = props;
    const {UI: {dashboard, loadingAddApp, calendarAddAppOpen}} = props;
    let appointment;  

    let eventStyleGetter = (event, start, end, isSelected) => {
        var backgroundColor = '#cceeff';
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.9,
            color: 'black'
        }  
        return {
            style: style
        }
    }



    let handleSelected = (event) => {
        // value is username of doctor
        let value = event.target.value.split('$-$')
        setSelected(value[0])
        setFullName(value[1])
    }

    let handleClicked = () => {

        if (selected !== ''){
            let age = 20;
            let today = new Date()
            users.forEach(user => {
                let birthDate = new Date(user.birthDate);
                let diff = today.getFullYear()  - birthDate.getFullYear()
                if (diff < age){
                    age = diff
                }
            })

            let doctorSelected = allDoctors.filter(doc => doc.userName === selected);
            props.getDoctorAvailabilities(age, selected,doctorSelected[0].region, doctorSelected[0].country )


            if (calendarAddAppOpen){    
                props.closeCalendarApp()
            }

        }
    }

    useEffect(()=> {
        setSelected('')
        setFullName('')
        props.closeCalendarApp()
    }, [dashboard])

    
    useEffect(()=> {
        props.closeCalendarApp()
    }, [selected])

        
    let handleCalendarClick = (event) => {
        let app = {
            start: event.start, 
            end: event.end, 
            title: event.title, 
            fullName: fullName, 
            userName: selected
        }
        props.openCalendarDialog(app)

    }


    if (!loading) {

        if (client.type === 'patient'){

            appointment = (
            
                <Fragment>
                    <DialogAddApp/>
                    <Paper  elevation={6} style={{width: '70%', margin: '25px auto 0 auto', padding:  '0 5% 3% 5%'}} >
                                    
                        <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AddIcon/>
                            </Avatar>
                            
                            <List>
                                
                                <ListItem sx={{mb: 2}} key="book">
                                    <Typography fontSize={25}  style={{margin: 'auto'}} variant="h4">
                                        Book Appointment
                                    </Typography>
                                </ListItem>
                                
                                <Box sx={{ width: 195, m: 'auto' }}>

                                    <TextField
                                        fullWidth
                                        label="Select a Professional"
                                        select
                                        defaultValue={7}
                                        onChange={handleSelected}
                                    >

                                        {

                                            client.doctor.map(doc => (
                                                <MenuItem value={`${doc.userName}$-$${doc.fullName}`}>{doc.fullName}</MenuItem>
                                            ))
                                        }
                                       
                                    </TextField>
                                </Box>
    
                                <ListItem sx={{mt: 3}} key="availabilities">
                                    <Button style={{margin: 'auto'}} color="secondary" variant="contained" onClick={handleClicked} >
                                    {!loadingAddApp ? 'View Availabilities': <CircularProgress size={20} color="inherit"/>}
                                    </Button>
                                </ListItem>
                        
                            </List>
    
                        </Box>

                        {selected !== '' && calendarAddAppOpen ? 

                            <Calendar localizer={localizer} 
                                events={availableTimeSlots} 
                                step={30}
                                className="pointA"
                                onSelectEvent={handleCalendarClick}
                                startAccessor="start" 
                                endAccessor="end" 
                                eventPropGetter={eventStyleGetter}
                                style={{height: 550 , margin: 'auto', width: '90%', color: 'red'}}
                            />
                    
                        : <Fragment></Fragment>
                        
                        }
                       
                        
                    </Paper>
                </Fragment>
            
            )

        } else {

                    
            appointment = (
                <AddAppointmentDoctor/>
            )

            }
    }
    else {

                appointment = (
        
                    <div style={{margin: 'auto'}}>
                        <CircularProgress color="secondary" size={200} thickness={1} sx={{overflow: 'auto', position: 'relative', m: 7}} />
                    </div>
                
                )
        
    }
        
        
    if (dashboard !== 'appointment'){
        return (
            <Fragment></Fragment>
        )
    }

    return appointment


}


Appointment.propTypes = {
    openCalendarDialog: PropTypes.func.isRequired,
    getDoctorAvailabilities: PropTypes.func.isRequired,
    closeCalendarApp: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   user: state.user,
   UI: state.UI
})

const mapActionsToProps = {
    closeCalendarApp,
    getDoctorAvailabilities,
    openCalendarDialog
}

export default connect(mapStateToProps, mapActionsToProps) (Appointment);





