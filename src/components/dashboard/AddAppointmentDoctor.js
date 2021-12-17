

import React, { Fragment, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from "../../util/MyButton";
// MUI
import Button from '@mui/material/Button'

import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material//DialogContent';
import DialogTitle from "@mui/material//DialogTitle";
import CircularProgress from '@mui/material//CircularProgress';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

//Icons
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box'
//Redux
import {connect} from 'react-redux';
import {setDashboard, docBookAppointment} from '../../redux/actions/userActions';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import CheckBox from '@mui/icons-material/CheckBox';

let AddAppointmentDoctor = (props) => {

    let navigate = useNavigate()
    let today = new Date()

    const [participants, setParticipants] = useState([])
    const [error, setError] = useState(false)
    const [initialDate, setInitialDate] = useState(today)
    const [userNames, setUserNames] = useState([])
    const [start, setStart] = useState(today)
    const [end, setEnd] = useState(today)

    const handleChangeStart = (newValue) => {
        setStart(newValue)
    };

    const handleChangeEnd = (newValue) => {
        setEnd(newValue)
    };

    const { UI: { loadingAddApp }, user: {patients} } = props;
    
    let handleAdd = () => {

        if (start !== initialDate && end !== initialDate && participants.length !== 0){

            // get email to add
            let people = patients.filter(element => element.userName === userNames[0])
            let email = people[0].email
            props.docBookAppointment(participants, start, end, email)
            navigate('/home')
            setError(false)
        } else {
            setError(true)
        }
    }

    let handleClose = () => {
        setError(false)
        navigate('/home')
        props.setDashboard('home')
    }

    let addParticipant = (event) => {
        let person = {
            userName: event.target.id, 
            fullName: event.target.name
        }

        if (userNames.includes(person.userName)){
            setParticipants(participants => participants.filter(element => element.userName !== person.userName))
            setUserNames(userNames => userNames.filter(element => element !== person.userName))
        } else {
            setParticipants(participants => [...participants, person])
            setUserNames(userNames => [...userNames, person.userName])
        }
    }

    return (
        <Fragment>
            <Dialog open={true} fullWidth maxWidth='sm' >
                <MyButton tip="Close" tipClassName='closeButton' btnClassName='closeButton' onClick={handleClose}>
                    <CloseIcon/>
                </MyButton>
                <DialogTitle style={{textAlign: "center"}}>New Appointment</DialogTitle>
                <DialogContent>

                <List>
                    
                    <ListItem style={{textAlign: "center"}}>
                        <ListItemText
                            primary={<b className="listItemText">Time</b>}
                        />
                    </ListItem>

                    <Box sx={{mt: 2}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={2} direction="row">
                                <DateTimePicker
                                label="Start"
                                value={start}
                                minutesStep={30}
                                onChange={handleChangeStart}
                                renderInput={(params) => <TextField {...params} />}
                                />
                                <DateTimePicker
                                minDateTime={start}
                                minutesStep={30}
                                label="End"
                                value={end}
                                onChange={handleChangeEnd}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Box>

                    <ListItem style={{textAlign: "center"}} sx={{mt: 2}}>
                        <ListItemText
                            primary={<b className="listItemText">Participants</b>}  
                        />
                    </ListItem>
    
                    <Paper style={{maxHeight: 205, overflow: 'auto', alignItems: 'center'}}>
                            <List id="checkedDates" >
                                {patients.map(patient => (
                                    <ListItem key={patient.fullName} >
                                        {patient.fullName}
                                        <Checkbox 
                                        checkedIcon={<CheckBox/>} 
                                        name={patient.fullName} 
                                        id={patient.userName}
                                        onChange={addParticipant} 
                                        disabled={false} 
                                        />
                                    </ListItem>
                                ))}
                            </List>
                    </Paper>

                    {error ?
                            <ListItem  sx={{mt: 2}} style={{textAlign: "center"}} key='error'>
                                <ListItemText>
                                    <Typography
                                        color="red"
                                        fontSize={15}
                                        >
                                        Make sure you have selected a patient and the dates are correct
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            : <Fragment></Fragment>
                        }

                    <ListItem sx={{mt: 3}}>
                        <Button style={{margin: 'auto'}} color="secondary" variant="contained" onClick={handleAdd}>
                            {!loadingAddApp ? 'Set Appointment': <CircularProgress size={20} color="inherit"/>}
                        </Button>
                    </ListItem>
                
                    
                </List>
            
                </DialogContent>
                <br/>
            </Dialog>
        </Fragment>
    )


}

AddAppointmentDoctor.propTypes = {
    docBookAppointment: PropTypes.func.isRequired,
    setDashboard: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    setDashboard,
    docBookAppointment
}

export default connect(mapStateToProps, mapActionsToProps) (AddAppointmentDoctor);







