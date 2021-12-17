import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button} from '@mui/material';

import {connect} from 'react-redux';
import {addWorkingTimeSlot} from '../../redux/actions/userActions';

let TimePick = (props) => {

    const {day} = props;
    const [hidden, setHidden] = useState(false)
    const [timesCalled, setTimeCalled] = useState(0)
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const handleChangeStart = (newValue) => {
        setStart(newValue);

    };

    const handleChangeEnd = (newValue) => {
        setEnd(newValue);
    };

    let submit = (s) => {
        setTimeCalled(timesCalled + 1);
        if (timesCalled === 0){
            props.addWorkingTimeSlot(day, s)
        }        
    }    

    useEffect(()=> {

        if (props.submitChanges && !hidden){
            
            let s = {
                start: {
                    minutes: start.getMinutes(),
                    hour: start.getHours()
                },
                end: {
                    minutes: end.getMinutes(),
                    hour: end.getHours()
                }
            }
            submit(s)
        }

    }, [props.submitChanges])


    const hide = () => {
        setHidden(true)
    }

    if (hidden){
        return (
            <Fragment></Fragment>
        )

    } else {
        return (
            <Fragment>

          
            <Paper style={{margin: 3, alignItems: 'center', padding: 7}} > 
                                              
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <Stack spacing={2} direction="row">
                    <TimePicker
                        minutesStep={30}
                        label="Start"
                        value={start}
                        onChange={handleChangeStart}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        minutesStep={30}
                        label="End"
                        value={end}
                        onChange={handleChangeEnd}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button style={{marginRight: 6}} onClick={hide}>
                        <CancelOutlinedIcon color="secondary" />
                    </Button>    
                    
                    </Stack>
                </LocalizationProvider>
        
            </Paper>
 
            </Fragment>
        )
    }
    
}


TimePick.propTypes = {
    submitChanges: PropTypes.bool.isRequired,
    day: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addWorkingTimeSlot: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
   addWorkingTimeSlot
}

export default connect(mapStateToProps, mapActionsToProps) (TimePick);
