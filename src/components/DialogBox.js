
import React, { Fragment, useEffect, useState} from 'react';
import {useNavigate } from "react-router";
import PropTypes from 'prop-types';
import MyButton from "../util/MyButton";
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
// MUI
import Button from '@mui/material/Button'
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material//DialogContent';
import DialogTitle from "@mui/material//DialogTitle";
import CircularProgress from '@mui/material//CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
//Icons
import CloseIcon from '@mui/icons-material/Close';
//Redux
import {connect} from 'react-redux';
import { setAppointmentIdToNull, cancelAppointment } from '../redux/actions/userActions'
import {parseISOString} from '../ressources/useful'


let DialogBox = (props) => {

    let navigate = useNavigate()

    dayjs.extend(LocalizedFormat)
    const { UI: { appointmentId, cancelLoading }, user: {appointments} } = props;
    
    const [appointmentThere, setAppointmentThere] = useState(false)
    let [appointment0, setAppointment0] = useState(null)
   
    let [openDialog, setOpenDialog] = useState(false)

    useEffect(()=> {
        setAppointment0(appointments.filter(element => element.id === appointmentId));
        if (appointment0 !== null){
            setAppointmentThere(true)
            setOpenDialog(true)
            navigate(`/home/appointments/${appointmentId}`)
        }
    }, [appointmentId])

    let handleCancel = () => {
        console.log(appointmentId)
        props.cancelAppointment(appointmentId)
        handleClose()
    }

    let handleClose = () => {
        setAppointmentThere(false)
        setOpenDialog(false)
        setAppointment0(null)
        navigate('/home')
        props.setAppointmentIdToNull()
    }

    if (appointmentThere){
        return (
            <Fragment>
                <Dialog open={openDialog} fullWidth maxWidth='sm' >
                    <MyButton tip="Close" onClick={handleClose} tipClassName='closeButton' btnClassName='closeButton'>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle style={{textAlign: "center"}}>Appointment Details</DialogTitle>
                    <DialogContent>

                    <List dense={true} >
                       
                        <ListItem style={{textAlign: "center"}} key="time">
                            <ListItemText
                                primary={<b className="listItemText">Time</b>}
                                secondary={dayjs(appointment0[0].start).format('llll')}
                            />
                        </ListItem>
        
                        <ListItem style={{textAlign: "center"}} key="duration">
                            <ListItemText
                                primary={<b className="listItemText">Duration</b>}
                                secondary={`${
                                    Math.ceil(Math.abs(parseISOString(appointment0[0].end) - parseISOString(appointment0[0].start))/ (1000 * 60 ))
                                } minutes`}
                            />
                        </ListItem>

                        <ListItem style={{textAlign: "center"}} key="medical">
                            <ListItemText
                                primary={<b className="listItemText">Practitioner</b>}
                                secondary={appointment0[0].doctor.fullName}
                            />
                        </ListItem>

                        <ListItem style={{textAlign: "center"}} key="peoplethere">
                            <ListItemText
                                primary={<b className="listItemText">Participant(s)</b>}
                                secondary={appointment0[0].participants.map((element, i) =>  `-${element.fullName} `)}
                            />
                        </ListItem>
                        <ListItem style={{textAlign: "center"}} key="userContact">
                            <ListItemText
                                primary={<b className="listItemText">Contact</b>}
                                secondary={appointment0[0].email}
                            />
                        </ListItem>

                        <ListItem sx={{mt: 3}} key="cancelMeeting">
                            <Button style={{margin: 'auto'}} color="secondary" variant="contained" onClick={handleCancel}>
                                {!cancelLoading ? 'Cancel Meeting': <CircularProgress />}
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

DialogBox.propTypes = {
    cancelAppointment: PropTypes.func.isRequired,
    setAppointmentIdToNull: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    setAppointmentIdToNull,
    cancelAppointment
}

export default connect(mapStateToProps, mapActionsToProps) (DialogBox);











