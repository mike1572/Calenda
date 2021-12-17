
import React, { Fragment, useState} from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import countries from '../../ressources/countries';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

//Redux
import {connect} from 'react-redux';
import Button from '@mui/material/Button';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import {setDashboard, addDocToList} from '../../redux/actions/userActions'
import NoMatch from '../../util/NoMatch'

let Professionals = (props) => {

    const {user: {client, loading, allDoctors} } = props;
    const {UI: {dashboard, addProf}} = props;

    const [patient, setPatient] = useState(null)

    let clients;

    let handleClick = (event) => {
        let user = allDoctors.find( ({userName}) => userName === event.target.id);
        setPatient(user)
    }

    let alreadyInList = (person) => {
        let user = client.doctor.find( ({userName}) => userName === person);
        if (user === undefined){
            return false
        } else {
            return true
        }
    }

    let addToListDoctors = (event) => {
        let doctor = {
            userName: event.currentTarget.value,
            fullName: event.currentTarget.name
        }

        props.addDocToList(doctor.userName, doctor.fullName)

    }

    if (!loading) {

        if (client.type === 'patient'){

        clients = (
            <Fragment>

                        <Paper elevation={6} style={{margin: '25px auto 0 auto', padding:  '0 10% 5% 10%'}} >
                                    
                        <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <SupervisedUserCircleIcon/>
                            </Avatar>
                        
                            <List>
                            
                                <ListItem sx={{mb: 0}}>
                                    <Typography  style={{margin: 'auto'}} fontSize={23}>
                                        All Professionals
                                    </Typography>
                                </ListItem>

                                {
                                    allDoctors.length === 1 ?  
                                    <ListItem sx={{mb: 1}}>
                                        <Typography  style={{margin: 'auto'}} fontSize={15}>
                                            There is a total of 1 professional
                                        </Typography>
                                    </ListItem>  : 
                                    <ListItem sx={{mb: 1}}>
                                        <Typography  style={{margin: 'auto', justifyContent: 'center'}} fontSize={15}>
                                            {`There are a total of ${allDoctors.length} professionals`}
                                        </Typography>
                                    </ListItem> 
                                }
                                 
                                <Paper style={{maxHeight: 350, maxWidth: 300, overflow: 'auto', alignItems: 'center'}}>
                                    <List>
                                        {allDoctors.map(element => (
                                            <ListItem id={element.userName} button key={element.userName} onClick={handleClick}>{element.fullName}</ListItem>
                                        ))}
                                    </List>
                                </Paper>   

                                <ListItem sx={{mb: 0, mt: 2}}>
                                    <Typography  style={{margin: 'auto'}} fontSize={22}>
                                        Your Professionals
                                    </Typography>
                                </ListItem>    
                                <Paper style={{maxHeight: 350, maxWidth: 300, overflow: 'auto', alignItems: 'center'}}>
                                    <List>
                                        {client.doctor.map(element => (
                                            <ListItem id={element.userName} button key={element.userName} onClick={handleClick}>{element.fullName}</ListItem>
                                        ))}
                                    </List>
                                </Paper>                 
                                
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
                                <AccountCircle />
                            </Avatar>
                            
                            <List>
                                
                                <ListItem sx={{mb: 1}}>
                                    <Typography  style={{margin: 'auto'}} fontSize={23}>
                                        Contact
                                    </Typography>
                                </ListItem>

                                
                                {
                                    patient === null ?       
                                    <ListItem sx={{mb: 1}}>
                                        <Typography  style={{margin: 'auto'}} fontSize={15}>
                                            Select a professional to view info
                                        </Typography>
                                    </ListItem> : 
                                        
                                    <Fragment>
                                        <ListItem>
                                            <PersonIcon sx={{mr: 2}}/>
                                            <ListItemText primary={patient.fullName} />
                                        </ListItem>

                                        <ListItem>
                                            <EmailIcon sx={{mr: 2}}/>
                                            <ListItemText primary={patient.email} />
                                        </ListItem>

                                        
                                        <ListItem>
                                            <LocationOnIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`${patient.region}, ${countries[patient.country]}`} />
                                        </ListItem>
                                   

                                    {   !alreadyInList(patient.userName) ? 
                                        <ListItem sx={{mt: 3}}>
                                        <Button style={{margin: 'auto'}} color="secondary" variant="outlined" name={patient.fullName} value={patient.userName} onClick={addToListDoctors} >
                                            {!addProf ? 'Add To Your List': <CircularProgress color="secondary" />}
                                        </Button>
                                        </ListItem>
                                        :   
                                        <Fragment></Fragment>
                                    }

                                    </Fragment>
                                              
                                
                                }
                                
              

                           


                            </List>

                        </Box>
                    </Paper>
            </Fragment>
        )

        } else {

            
            clients = (
                <Fragment>
                    <NoMatch/>
                </Fragment>
            )
        }

    } else {

        clients = (

            <div style={{margin: 'auto'}}>
                <CircularProgress color="secondary" size={200} thickness={1} sx={{overflow: 'auto', position: 'relative', m: 7}} />
            </div>
        
        )
    
    }

    

    if (dashboard !== 'professionals'){
        return (
            <Fragment></Fragment>
        )
    }
    
    return clients

}


Professionals.propTypes = {
    addDocToList: PropTypes.func.isRequired,
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
    addDocToList
}

export default connect(mapStateToProps, mapActionsToProps) (Professionals);

