
import React, { Fragment, useState} from 'react';
import PropTypes from 'prop-types';

import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material//DialogContent';
import DialogTitle from "@mui/material//DialogTitle";
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import CloseIcon from '@mui/icons-material/Close';
import MyButton from '../../util/MyButton';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Redux
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import {closeReserveWindow, addReservedTime} from '../../redux/actions/userActions';

let ReserveTime = (props) => {

    const {UI: {loadingAddReserve, reserveWindowOpen}} = props;


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('');
    const [shown, setShown] = useState(false);
    const [age, setAge] = useState(0);


    const resetState = () => {
        setStartDate('')
        setEndDate('')
        setType('')
        setAge(0)
        setShown(false)
    }
    const closeWindow = () => {
        resetState()
        props.closeReserveWindow()
    }

    let handleSelectAge = (event) => {
        setAge(event.target.value)
    }

    let handleSelectType = (event) => {
        if (event.target.value === 'F'){
            if (!shown){
                setShown(true)

            }
        } else if (event.target.value === 'P'){
            if (shown){

                setShown(false)
            }
        }
       
        setType(event.target.value)
    }

    let convertToStart = (date) => {
        let s = new Date(date)
        s.setHours(0)
        s.setMinutes(0)
        s.setSeconds(0)
        s = s.toISOString()
        return s;
    }

    let convertToEnd = (date) => {
        let s = new Date(date)
        s.setHours(23)
        s.setMinutes(59)
        s.setSeconds(59)
        s = s.toISOString()
        return s;
    }

    let handleSubmit = () => {

        if (shown){

            if (startDate !== '' && endDate !== '' && type !== '' && age !== ''){
                props.addReservedTime(convertToStart(startDate),convertToEnd(endDate), type, age )
                resetState()
            }
        } else {
            if (startDate !== '' && endDate !== '' && type !== ''){
                props.addReservedTime(convertToStart(startDate),convertToEnd(endDate), type, age )
                resetState()
            }
        }

    }

    return (
         <Fragment>
                <Dialog open={reserveWindowOpen}  fullWidth maxWidth='sm' >
                    <MyButton tip="Close" tipClassName='closeButton' btnClassName='closeButton' onClick={closeWindow}>
                        <CloseIcon/>
                    </MyButton>
                 
                    <DialogTitle style={{textAlign: "center"}}>
                        <Typography  style={{margin: 'auto'}} variant="h5">
                            Reserved Time
                        </Typography>
                    </DialogTitle>

                    <DialogContent style={{height: 440}} >
                        <Typography fontSize={16} style={{textAlign: "center"}} sx={{mb: 2, mt: 1}}>
                            Reserve specific range of days for you or your special patients
                        </Typography>
                        <Typography fontSize={16} style={{textAlign: "center"}} sx={{mb: 3}}>
                            Conditions are affecting your schedule based on your provided working time
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDateFns} style={{padding: 5}}>
                        <DatePicker
                            minDate={new Date()}
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => {
                            setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                        <span style={{margin: 5}}/>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            minDate={new Date(startDate)}
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => {
                            setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>

                        <Box sx={{ maxWidth: 270, m: 'auto', mt: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                            value={type}
                            onChange={handleSelectType}
                            >
                            <MenuItem value={'P'}>Personal time</MenuItem>
                            <MenuItem value={'F'}>Families with young patients</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>

                        {shown ?

                        <Fragment>
                            <Typography fontSize={15} style={{textAlign: "center"}} sx={{mb: 2, mt: 2}}>
                                Families with kids below what age? (inclusive)
                            </Typography>
                        <Box sx={{ maxWidth: 270, m: 'auto', mt: 2 }}>
                        
                        <FormControl fullWidth>
                            <InputLabel>Age</InputLabel>
                            <Select
                            value={age}
                           
                            onChange={handleSelectAge}
                            >
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        </Fragment>
                        : <Fragment></Fragment>
                        }

                        <Typography fontSize={16} style={{textAlign: "center"}} sx={{mb: 2, mt: 4, ml: 6, mr: 6}}>
                            Please note that this condition does not apply to existing appointments in this time range.<br/>They can be cancelled manually.
                        </Typography>
                        <ListItem sx={{mt: 3}}>
                            <Button style={{margin: 'auto'}} color="secondary" variant="contained" onClick={handleSubmit} >
                                {!loadingAddReserve ? 'Save': <CircularProgress />}
                            </Button>
                        </ListItem>                     

                    </DialogContent>
                </Dialog>
        </Fragment>

    )
}

ReserveTime.propTypes = {
    addReservedTime: PropTypes.func.isRequired,
    closeReserveWindow: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

const mapActionsToProps = {
    closeReserveWindow,
    addReservedTime
}

export default connect(mapStateToProps, mapActionsToProps) (ReserveTime);












