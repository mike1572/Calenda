import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
//Redux
import {connect} from 'react-redux';

//MUI
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Stack from '@mui/material/Stack';

import WorkingHours from './WorkingHours';
import countries from '../../ressources/countries';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import {setWorkingOpenTrue, openReserveWindow, removeReservedTime} from '../../redux/actions/userActions';
import CakeIcon from '@mui/icons-material/Cake';
import ReserveTime from './ReserveTime'
import { parseISOString } from '../../ressources/useful';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';


let Profile = (props) => {

    const {user: {client, loading, time}  } = props;
    const {UI: {dashboard, loadingRemoveReserve}} = props;

    dayjs.extend(LocalizedFormat)

    let profile;

    let handleOpenEditWorkingHours = () => {
        props.setWorkingOpenTrue()
    }

    let handleOpenReserve = () => {
        props.openReserveWindow()
    }

    let handleCancel = (event) => {
        let ti = time.reserved[event.currentTarget.value]
        props.removeReservedTime(ti)
    }

    if (!loading) {
        if (client.type === 'doctor'){       
            profile = (
                <Fragment>
                    
                    <WorkingHours />
                    <ReserveTime />
                    <Paper component="main" elevation={6} style={{maxHeight: 650, margin: '25px auto 0 auto', padding:  '0 5% 5% 5%'}} >
                      
                        <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AccountCircle />
                            </Avatar>
                            
                            <List>
                                
                                <ListItem sx={{mb: 2}} key="profile">
                                    <Typography  style={{margin: 'auto'}} fontSize={27}>
                                        Profile
                                    </Typography>
                                </ListItem>

                                <ListItem key="fullName">
                                    <PersonIcon sx={{mr: 2}}/>
                                    <ListItemText primary={client.fullName} />
                                </ListItem>
                                
                                <ListItem key="email"> 
                                    <EmailIcon sx={{mr: 2}}/>
                                    <ListItemText primary={client.email} />
                                </ListItem>

                                <ListItem key="userName">
                                    <AlternateEmailOutlinedIcon sx={{mr: 2}}/>
                                    <ListItemText primary={client.userName} />
                                </ListItem>
                              

                                <ListItem key="region">
                                    <LocationOnIcon sx={{mr: 2}}/>
                                    <ListItemText primary={`${client.region}, ${countries[client.country]}`} />
                                </ListItem>

                                <ListItem sx={{mb: -0.5}} key="professional" >
                                    <AccountBoxIcon sx={{mr: 2}}/>
                                    <ListItemText primary="Account for professional" />
                                </ListItem>

                                <ListItem sx={{mb: -1}} key="editWorkingHours" >
                                    <WorkIcon sx={{mr: 2}}/>
                                    <Button color="secondary" variant="outlined" onClick={handleOpenEditWorkingHours}>
                                        <ListItemText primary="Edit Working Time" key="item" />
                                    </Button>
                                    
                                </ListItem>

                                <ListItem key='editReservedTime' >
                                    <AccessTimeIcon sx={{mr: 2}}/>
                                    <Button color="secondary" variant="outlined" >
                                        <ListItemText primary="Add Reserved Time" key="openReserveButton" onClick={handleOpenReserve} />
                                    </Button>
                                    
                                </ListItem>

                            </List>

                        </Box>
                    </Paper>

                    <Paper elevation={6} style={{margin: '25px auto 0 auto', padding:  '0 5% 5% 5%'}} >
                      
                        <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <AccessTimeOutlinedIcon/>
                            </Avatar>
                          
                            <List>
                              
                                <ListItem sx={{mb: 2}} key="workingTime">
                                    <Typography  style={{margin: 'auto'}} variant="h5">
                                      Working Time
                                    </Typography>
                                </ListItem>
                              
                                <ListItem sx={{mt: -1.5}} key="stackText">

                                    <Stack direction='column' justifyContent="center">
                                        <Typography sx={{m: 'auto'}}>
                                            {`Your patients can book up to ${time.rule}${time.rule === 1 ? ' month' : ' months'} in advance`}
                                        </Typography>
                                        <Typography sx={{m: 'auto'}}>
                                            {`Your patients can book ${time.earliestDay} ${time.earliestDay === 1 ? ' day' : ' days'} the earliest before their appointment date`}
                                        </Typography>
                                    </Stack>

                                </ListItem>

                                <ListItem sx={{mb: 1}} key="holidays">
                                    <Typography  style={{margin: 'auto'}} variant="h6">
                                      Holidays
                                    </Typography>
                                </ListItem>         
                                <Paper style={{maxHeight: 125, overflow: 'auto', alignItems: 'center'}}>
                                    <List>
                                        {time.holidays.map(element => (
                                            <ListItem key={element}>{element}</ListItem>
                                        ))}
                                    </List>
                                </Paper>                     
                                <ListItem sx={{mb: 1, mt: 1}} key="workingWeek">
                                    <Typography  style={{margin: 'auto'}} variant="h6">
                                      Working Week
                                    </Typography>
                                </ListItem> 
                                <Paper style={{maxHeight: 170, overflow: 'auto', alignItems: 'center'}}>
                                    <List>
                                        {
                                            time.workingDays.length !== 0 ?(
                                                <Fragment>

                                                {Object.keys(time.workingDays).map(day => (

                                                    <ListItem key={day}>
                                                   {day}
                                                    <List>
                                                        {time.workingDays[day].map(element => (
                                                            <ListItem key="element">
                                                                {element.start.hour > 12 ? element.start.hour -12 : element.start.hour}:{element.start.minutes < 10 ? `0${element.start.minutes}` : element.start.minutes }{element.start.hour >= 12 ? 'pm' : 'am'} to 
                                                                {element.end.hour > 12 ? ` ${element.end.hour -12}` : ` ${element.end.hour}`}:{element.end.minutes < 10 ? `0${element.end.minutes}` : element.end.minutes }{element.end.hour >= 12 ? 'pm' : 'am'}
                                                            
                                                            </ListItem>
                                                        ))}
                                                    </List> 
                                                    </ListItem>
                                                ))}


                                                </Fragment>
                                            ) : (
                                                <Fragment></Fragment>
                                            )

                                        }
                                   
                                    </List>
                                </Paper>   

                                <ListItem sx={{mb: 1, mt: 1}} key="reservedTimeNow">
                                    <Typography  style={{margin: 'auto'}} variant="h6">
                                        Reserved Time
                                    </Typography>
                                </ListItem> 

                                <Paper style={{maxHeight: 300, overflow: 'auto', alignItems: 'center'}}>
                                    <List>
                                        {
                                            time.reserved.length !== 0 ?(
                                                <Fragment>

                                                {time.reserved.map(slot => (

                                                    <ListItem sx={{border: 1}}>
                                                        <List>
                                                            {
                                                                slot.age === 0 ? 
                                                                <ListItem key="personalTime">
                                                                    <ListItemText>
                                                                        Personal Time
                                                                    </ListItemText>
                                                                </ListItem>
                                                                :
                                                                <ListItem key="families">
                                                                    <ListItemText>
                                                                        Reserved for families with children aged {slot.age} and under
                                                                    </ListItemText>
                                                                </ListItem>

                                                            }
                                                            <ListItem key="startTime">
                                                                <ListItemText>
                                                                    <b>From:</b> {dayjs( parseISOString(slot.start)).format('llll')}
                                                                </ListItemText>
                                                            </ListItem>
                                                            <ListItem>
                                                                <ListItemText key="endTime">
                                                                    <b>To:</b> {dayjs( parseISOString(slot.end)).format('llll')}
                                                                </ListItemText>
                                                            </ListItem>
                                                            <ListItem key="Removetime" >
                                                                <Button color="secondary" variant="contained" value={time.reserved.indexOf(slot)} onClick={handleCancel} >
                                                                    {!loadingRemoveReserve ? 'Remove': <CircularProgress />}
                                                                </Button>
                                                            </ListItem>                                         
                                                        </List>

                                                    </ListItem>
                                                ))}


                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                                                           
                                                    <ListItem sx={{mb: 1, mt: 1}} key="noReservedSlots">
                                                        <Typography  style={{margin: 'auto'}} fontSize={17} >
                                                            There are no reserved time slots
                                                        </Typography>
                                                    </ListItem> 
                                                </Fragment>
                                            )

                                        }
                                   
                                    </List>
                                </Paper>  

                            </List>
                        </Box>
                    </Paper>

                </Fragment>

          
            )
       
        } else {
            
            profile = (
                <Paper component="main" elevation={6} style={{margin: '25px auto 0 auto', padding:  '0 15% 5% 15%'}} >
                      
                <Box
                sx={{
                    marginTop: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircle />
                    </Avatar>
                    
                    <List>
                        
                        <ListItem sx={{mb: 2}} key='profile'>
                            <Typography  style={{margin: 'auto'}} fontSize={27}>
                                Profile
                            </Typography>
                        </ListItem>
                        
                        <ListItem key="fullName">
                            <PersonIcon sx={{mr: 2}}/>
                            <ListItemText primary={client.fullName} />
                        </ListItem>
                        
                        <ListItem key="email">
                            <EmailIcon sx={{mr: 2}}/>
                            <ListItemText primary={client.email} />
                        </ListItem>

                        <ListItem key="userName">
                            <AlternateEmailOutlinedIcon sx={{mr: 2}}/>
                            <ListItemText primary={client.userName} />
                        </ListItem>

                        <ListItem key="birthDate">
                            <CakeIcon sx={{mr: 2}}/>
                            <ListItemText primary={`${client.birthDate}`} />
                        </ListItem>

                        <ListItem sx={{mb: -0.5}} >
                            <AccountBoxIcon sx={{mr: 2}}/>
                            <ListItemText primary="Account for patient" />
                        </ListItem>


                    </List>

                </Box>
            </Paper>
            )
        
        }

    } else {

        profile = (

            <div style={{margin: 'auto'}}>
                <CircularProgress color="secondary" size={200} thickness={1} sx={{overflow: 'auto', position: 'relative', m: 7}} />
            </div>
        
        )
    
    }

    

    if (dashboard !== 'profile'){
        return (
            <Fragment></Fragment>
        )
    }
    
    return profile
}

Profile.propTypes = {
    removeReservedTime: PropTypes.func.isRequired,
    openReserveWindow: PropTypes.func.isRequired,
    setWorkingOpenTrue: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    setWorkingOpenTrue,
    openReserveWindow,
    removeReservedTime
}

export default connect(mapStateToProps, mapActionsToProps) (Profile);


