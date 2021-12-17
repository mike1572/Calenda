
import React, { Fragment, useState} from 'react';
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';
import MyButton from "../../util/MyButton";
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
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
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import CheckBox from '@mui/icons-material/CheckBox';
//Icons
import CloseIcon from '@mui/icons-material/Close';
//Redux
import {connect} from 'react-redux';
import { closeCalendarDialog, patientBookAppointment } from '../../redux/actions/userActions';


let DialogAddApp = (props) => {

    
    let navigate = useNavigate()
    const [error, setError] = useState(false)
    const [participants, setParticipants] = useState([])
    const [userNames, setUserNames] = useState([])

    ///home/appointments/:id

    dayjs.extend(LocalizedFormat)
    const { UI: { showScheduleAppDialog, scheduleApp }, user: {selectedTimeSlot, users, client: {email}} } = props;
    

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

    let handleSchedule = () => {

        if (participants.length !== 0){

            let doctor = {
                userName: selectedTimeSlot.userName,
                fullName: selectedTimeSlot.fullName
            }

            props.patientBookAppointment(participants, email, doctor, selectedTimeSlot.start.toISOString(), selectedTimeSlot.end.toISOString())
            navigate('/home')
            setError(false)
        } else {
            setError(true)
        }

    }


    let handleClose = () => {
        props.closeCalendarDialog()
        setError(false)
    }

    if (showScheduleAppDialog){
        return (
            <Fragment>
                <Dialog open={showScheduleAppDialog} fullWidth maxWidth='sm' >
                    <MyButton tip="Close" onClick={handleClose} tipClassName='closeButton' btnClassName='closeButton'>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle style={{textAlign: "center"}}>{selectedTimeSlot.title}</DialogTitle>
                    <DialogContent>

                    <List dense={true} >
                       
                        <ListItem style={{textAlign: "center"}} key="from">
                            <ListItemText
                                primary={<b className="listItemText">From</b>}
                                secondary={dayjs(selectedTimeSlot.start).format('llll')}
                            />
                        </ListItem>
        
                        <ListItem style={{textAlign: "center"}} key='to'>
                            <ListItemText
                                primary={<b className="listItemText">To</b>}
                                secondary={dayjs(selectedTimeSlot.end).format('llll')}
                            />
                        </ListItem>

                        <ListItem style={{textAlign: "center"}} key='practitioner'>
                            <ListItemText
                                primary={<b className="listItemText">Practitioner</b>}
                                secondary={selectedTimeSlot.fullName}
                            />
                        </ListItem>

                        <ListItem style={{textAlign: "center"}} key='participants'>
                            <ListItemText
                                primary={<b className="listItemText">Select Participants</b>}
                            
                            />
                        </ListItem>

                        <Paper sx={{ml: 7, mr: 7, mt: 2}} style={{maxHeight: 175, overflow: 'auto', alignItems: 'center'}}>
                            <List id="checked"  >
                                {users.map(element => (
                                    <ListItem key={element.fullName} >
                                        {element.fullName}
                                        <Checkbox 
                                        checkedIcon={<CheckBox/>}  
                                        name={element.fullName} 
                                        id={element.userName}
                                        onChange={addParticipant} 
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
                                        You cannot book a meeting with no participants
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            : <Fragment></Fragment>
                        }


                        <ListItem sx={{mt: 3}} key="schedule">
                            <Button style={{margin: 'auto'}} color="secondary" variant="contained" onClick={handleSchedule}>
                                {!scheduleApp ? 'Schedule Appointment':  <CircularProgress size={20} color="inherit"/>}
                            </Button>
                        </ListItem>
                    
                     
                    </List>
               
                    </DialogContent>
                    <br/>
                </Dialog>
            </Fragment>
        )
    } else {
        return (
            <Fragment></Fragment>
        )
    }


}

DialogAddApp.propTypes = {
    patientBookAppointment: PropTypes.func.isRequired,
    closeCalendarDialog: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    closeCalendarDialog,
    patientBookAppointment
}

export default connect(mapStateToProps, mapActionsToProps) (DialogAddApp);











