
import React, { Fragment, useState} from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CakeIcon from '@mui/icons-material/Cake';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

//Redux
import {connect} from 'react-redux';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import {setDashboard} from '../../redux/actions/userActions'

import NoMatch from '../../util/NoMatch'

let Patients = (props) => {

    const {user: {client, loading, patients} } = props;
    const {UI: {dashboard}} = props;

    const [patient, setPatient] = useState(null)

    let clients;

    let handleClick = (event) => {
        let user = patients.find( ({userName}) => userName === event.target.id);
        setPatient(user)
    }


    if (!loading) {

        if (client.type === 'doctor'){

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
                                    <Typography  style={{margin: 'auto'}} fontSize={25}>
                                        All Patients
                                    </Typography>
                                </ListItem>

                                {
                                    patients.length === 1 ?  
                                    <ListItem sx={{mb: 1}}>
                                        <Typography  style={{margin: 'auto'}} fontSize={15}>
                                            You have a total of 1 patient
                                        </Typography>
                                    </ListItem>  : 
                                    <ListItem sx={{mb: 1}}>
                                        <Typography  style={{margin: 'auto', justifyContent: 'center'}} fontSize={15}>
                                            {`You have a total of ${patients.length} patients`}
                                        </Typography>
                                    </ListItem> 
                                }
                                 
                                <Paper style={{maxHeight: 350, maxWidth: 300, overflow: 'auto', alignItems: 'center'}}>
                                    <List>
                                        {patients.map(element => (
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
                                        Basic Info
                                    </Typography>
                                </ListItem>

                                
                                {
                                    patient === null ?       
                                    <ListItem sx={{mb: 1}}>
                                        <Typography  style={{margin: 'auto'}} fontSize={15}>
                                            Select a patient to view his basic info
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
                                            <CakeIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`${patient.birthDate}`} />
                                        </ListItem>
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

    

    if (dashboard !== 'patients'){
        return (
            <Fragment></Fragment>
        )
    }
    
    return clients

}


Patients.propTypes = {
    setDashboard: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    setDashboard
}

export default connect(mapStateToProps, mapActionsToProps) (Patients);

