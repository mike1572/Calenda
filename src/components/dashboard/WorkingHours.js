
import React, { Fragment, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types';

import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material//DialogContent';
import DialogTitle from "@mui/material//DialogTitle";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MyButton from '../../util/MyButton';
import TimePick from './TimePick';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

//Redux
import {connect} from 'react-redux';
import {setRuleHolidaysAndEarliestDay, setWorkingOpenFalse, setWorkToZero, updateWorkingData} from '../../redux/actions/userActions';

import Holidays from 'date-holidays';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { TextField } from '@mui/material';


let WorkingHours = (props) => {

    let navigate = useNavigate()

    const {user: {client: {country, region}}, UI: {workingOpen, updateWorkLoading}} = props;
    const [open, setOpen] = useState(false);

    useEffect(()=> {
        if (workingOpen){
            setOpen(true)
            navigate('/profile/workingtime')
        } else{
            setOpen(false)
        }

    }, [workingOpen])

    useEffect(()=> {
        if (!open){
            setAllToZero()
        }
    }, [open])


    let [holidaysNameNotWorking, setHolidaysNameNotWorking] = useState([])
    let hd;
    let holidays;

    const d = new Date();
    let year = d.getFullYear();

    const [workOnAllHolidays, setWorkOnHolidays] = useState(null)

    if (country !== null || region !== null){
        hd = new Holidays(country, region);
        holidays = hd.getHolidays(year);
    }

    let uncheckAll = (bool) => {
        let el = document.getElementById('checkedItems').querySelectorAll("input[type='checkbox']");
        for (let i = 0; i < el.length; i++) {
            el[i].checked = bool;
            el[i].click()
        }
    }

    let handleHoliday = () => {
        if (!workOnAllHolidays){
            uncheckAll(true)
            setWorkOnHolidays(true)
            let holy = hd.getHolidays(year)
            let days = holidaysNameNotWorking;
            holy.forEach((element) => {
                if (!days.includes(element.name)){
                    days.push(element.name)
                }                
            })
            setHolidaysNameNotWorking(days)
            
        } else {
            uncheckAll(false)
            setWorkOnHolidays(false)
            setHolidaysNameNotWorking([])
        } 
    }

    let addToList = (event) => {
        let values = []
        if (!event.target.checked){
            values = holidaysNameNotWorking.filter(element => element !== event.target.name);
            setHolidaysNameNotWorking(values);
            
        } else {
            values = holidaysNameNotWorking;
            values.push(event.target.name)
            setHolidaysNameNotWorking(values)
        }
    }

    let [numSunday, setNumSunday] = useState(0)
    let [numMonday, setNumMonday] = useState(0)
    let [numTuesday, setNumTuesday] = useState(0)
    let [numWednesday, setNumWednesday] = useState(0)
    let [numThursday, setNumThursday] = useState(0)
    let [numFriday, setNumFriday] = useState(0)
    let [numSaturday, setNumSaturday] = useState(0)

    let [rule, setRule] = useState(3)
    let [earliestDay, setEarliestDay] = useState(7);
    let [submitChanges, setSubmitChanges] = useState(false)

    let Sunday = [];
    let Monday = [];
    let Tuesday = [];
    let Wednesday = [];
    let Thursday = [];
    let Friday = [];
    let Saturday = [];

    let setAllToZero = () => {
        setWorkOnHolidays(null)
        setWorkOnHolidays(null)
        setNumSunday(0)
        Sunday = []
        setNumMonday(0)
        Monday = []
        setNumTuesday(0)
        Tuesday = []
        setNumWednesday(0)
        Wednesday = []
        setNumThursday(0)
        Thursday = []
        setNumFriday(0)
        Friday = []
        setNumSaturday(0)
        Saturday = []
        setRule(3)
        setEarliestDay(7)
        setSubmitChanges(false)
        setHolidaysNameNotWorking([])

    }
 

    for (let i = 0; i < numSunday; i++){
        Sunday.push(<TimePick day="Sunday" submitChanges={submitChanges}/>)
    }
    for (let i = 0; i < numMonday; i++){
        Monday.push(<TimePick day="Monday" submitChanges={submitChanges}/>)
    }   
    for (let i = 0; i < numTuesday; i++){
        Tuesday.push(<TimePick day="Tuesday" submitChanges={submitChanges}/>)
    }   
    for (let i = 0; i < numWednesday; i++){
        Wednesday.push(<TimePick day="Wednesday" submitChanges={submitChanges}/>)
    }   
    for (let i = 0; i < numThursday; i++){
        Thursday.push(<TimePick day="Thursday" submitChanges={submitChanges}/>)
    }   
    for (let i = 0; i < numFriday; i++){
        Friday.push(<TimePick day="Friday" submitChanges={submitChanges}/>)
    }   
    for (let i = 0; i < numSaturday; i++){
        Saturday.push(<TimePick day="Saturday" submitChanges={submitChanges}/>)
    }

    let addTimeSlot = (event) => {
        
        if (event.currentTarget.value === "Sunday"){
            setNumSunday(numSunday + 1);
        } else if (event.currentTarget.value === "Monday"){
            setNumMonday(numMonday + 1);
        } else if (event.currentTarget.value === "Tuesday"){
            setNumTuesday(numTuesday + 1);
        } else if (event.currentTarget.value === "Wednesday"){
            setNumWednesday(numWednesday + 1);
        } else if (event.currentTarget.value === "Thursday"){
            setNumThursday(numThursday + 1);
        } else if (event.currentTarget.value === "Friday"){
            setNumFriday(numFriday + 1);
        } else if (event.currentTarget.value === "Saturday"){
            setNumSaturday(numSaturday + 1);
        }
        
    }


    let handleChangeRule = (event) => {
        setRule(event.target.value)
    }

    let handleChangeEarliestDay = (event) => {
        setEarliestDay(event.target.value)
    }
      
    let print = () => {
        setSubmitChanges(true)
        props.setRuleHolidaysAndEarliestDay(rule, holidaysNameNotWorking, earliestDay)
        setOpen(false)
        navigate('/profile')
        props.setWorkingOpenFalse()
     
    }

    useEffect(()=> {
        let emptyWorkingDays = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
        };

        if (props.user.holidays !== null && JSON.stringify(props.user.workingTime) !== JSON.stringify(emptyWorkingDays) && props.user.rule !== null && props.user.earliestDay !== null){
            props.updateWorkingData(props.user.holidays, props.user.workingTime, props.user.rule, props.user.earliestDay)
            props.setWorkToZero()
            setAllToZero()
        }    

    },[props.user.workingTime])


    let handleCloseBox = () => {
        props.setWorkingOpenFalse()
        props.setWorkToZero()
        setAllToZero()
        navigate('/profile')
    }

    return (
        <Fragment>
                <Dialog open={open}  fullWidth maxWidth='sm' >
                    <MyButton tip="Close" tipClassName='closeButton' btnClassName='closeButton' onClick={handleCloseBox}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle style={{textAlign: "center"}}>Working Time</DialogTitle>
                    
                    <DialogContent>

                    <List dense={true} style={{margin: 'auto', height: 500}}>
                        
                        <ListItem alignItems="center" key="holidays">
                            <Typography sx={{mr: 5}}>
                                Do you work on the following holidays?
                            </Typography>
                            <FormControlLabel control={<Checkbox checkedIcon={<CloseOutlinedIcon/>} onChange={handleHoliday} />} label="No to all" />                          
                        </ListItem>

                        <Paper style={{maxHeight: 175, overflow: 'auto', alignItems: 'center'}}>
                            <List id="checkedItems">
                                {holidays.map(element => (
                                    <ListItem key={element.name} >
                                        {element.name}
                                        <Checkbox 
                                        checkedIcon={<CloseOutlinedIcon/>}  
                                        name={element.name} 
                                        onChange={addToList} 
                                        disabled={workOnAllHolidays} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <ListItem key="workingDays">
                            <Typography sx={{mt: 3}}>
                                Select your working days and add in your appointment availabilities
                            </Typography>
                        
                        </ListItem>

                        <Paper>
                            <List>
                                <ListItem key="Sunday">
                                    <ListItemText primary="Sunday"/>
                                    <Button value="Sunday" onClick={addTimeSlot}>
                                        <AddCircleOutlinedIcon color="secondary"/>
                                    </Button>
                                </ListItem>
                                {Sunday}
                                <Divider/>
                            </List>
                        </Paper>

                        
                        <Paper>
                            <List>
                                <ListItem key="Monday">
                                    <ListItemText primary="Monday"/>
                                    <Button value="Monday" onClick={addTimeSlot}>
                                        <AddCircleOutlinedIcon color="secondary"/>
                                    </Button>
                                </ListItem>
                                {Monday}
                                <Divider/>
                            </List>
                        </Paper>
                        
                        <Paper>
                            <List>
                                <ListItem key="Tuesday">
                                    <ListItemText primary="Tuesday"/>
                                    <Button value="Tuesday" onClick={addTimeSlot}>
                                        <AddCircleOutlinedIcon color="secondary"/>
                                    </Button>
                                </ListItem>
                                {Tuesday}
                                <Divider/>
                            </List>
                        </Paper>
                        
                        <Paper>
                            <List>
                                <ListItem key="Wednesday">
                                    <ListItemText primary="Wednesday"/>
                                    <Button value="Wednesday" onClick={addTimeSlot}>
                                        <AddCircleOutlinedIcon color="secondary"/>
                                    </Button>
                                </ListItem>
                                {Wednesday}
                                <Divider/>
                            </List>
                        </Paper>
                        
                        <Paper>
                            <List>
                                <ListItem key="Thursday">
                                    <ListItemText primary="Thursday"/>
                                    <Button value="Thursday" onClick={addTimeSlot}>
                                        <AddCircleOutlinedIcon color="secondary"/>
                                    </Button>
                                </ListItem>
                                {Thursday}
                                <Divider/>
                            </List>
                        </Paper>
                        
                        <Paper>
                            <List>
                                <ListItem key="Friday">
                                    <ListItemText primary="Friday"/>
                                    <Button value="Friday" onClick={addTimeSlot}>
                                        <AddCircleOutlinedIcon color="secondary"/>
                                    </Button>
                                </ListItem>
                                {Friday}
                                <Divider/>
                            </List>
                        </Paper>
                        
                        <Paper>
                            <List>
                                <ListItem key="Saturday">
                                    <ListItemText primary="Saturday"/>
                                    <Button value="Saturday" onClick={addTimeSlot}>
                                        <AddCircleOutlinedIcon color="secondary"/>
                                    </Button>
                                </ListItem>
                                {Saturday}
                              
                            </List>
                        </Paper>

                        <ListItem key="advanceTime">
                            <Typography sx={{mt: 3, mb: 2}}>
                                Amount of time your patients can book appointments in advance
                            </Typography>
                        
                        </ListItem>

                        <Box sx={{ width: 195, m: 'auto' }}>

                            <TextField
                                fullWidth
                                label="Number of Months"
                                select
                                value={rule}
                                defaultValue={3}
                                onChange={handleChangeRule}
                               
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </TextField>
                        </Box>

                        <ListItem key="earliestDay" >
                            <Typography sx={{mt: 3, mb: 2}} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                How early can a patient book an appointment with you ?
                                <br/>
                                <small style={{margin: 'auto'}}>Ex: 2 means your patients cannot schedule up to 2 days from now</small>
                            </Typography>
                       
                        
                        </ListItem>
                        
                        <Box sx={{ width: 195, m: 'auto' }}>

                            <TextField
                                fullWidth
                                label="Number of Days"
                                select
                                value={earliestDay}
                                defaultValue={7}
                                onChange={handleChangeEarliestDay}
                               
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </TextField>
                        </Box>
                       
    
                        <Stack sx={{mt: 4, pb: 3}} spacing={2} direction="row">
                            <Button sx={{m: 'auto'}} variant="contained" onClick={print} color="secondary">
                                {!updateWorkLoading ? 'Submit': <CircularProgress />}
                            </Button>
                        </Stack>
            

                    </List>
              
               
                    </DialogContent>
                    <br/>
                </Dialog>
        </Fragment>
    )

}

WorkingHours.propTypes = {
    updateWorkingData: PropTypes.func.isRequired,
    setWorkToZero: PropTypes.func.isRequired,
    setWorkingOpenFalse: PropTypes.func.isRequired,
    setRuleHolidaysAndEarliestDay: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    setRuleHolidaysAndEarliestDay,
    setWorkingOpenFalse,
    setWorkToZero,
    updateWorkingData
}

export default connect(mapStateToProps, mapActionsToProps) (WorkingHours);
