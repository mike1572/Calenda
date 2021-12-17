
import React, { Fragment} from 'react';
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
import PersonIcon from '@mui/icons-material/Person';

//Redux
import {connect} from 'react-redux';
import {openAddUserBox} from '../../redux/actions/userActions';

import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import NoMatch from '../../util/NoMatch'
import AddUser from './AddUser';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

let Users = (props) => {

    const {user: {client, loading, users} } = props;
    const {UI: {dashboard}} = props;

    let people;

    let openBox = () => {
        props.openAddUserBox()
    }

    if (!loading) {

        if (client.type === 'patient'){

        people = (
            <Fragment>
                    <AddUser/>
                    <Paper component="main" elevation={6} style={{margin: '25px auto 0 auto', padding:  '0 5% 3% 5%'}} >
                                    
                    <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <GroupAddIcon/>
                        </Avatar>
                        
                        <List>
                            
                            <ListItem sx={{mb: 2}}>
                                <Typography fontSize={23}  style={{margin: 'auto'}} variant="h4">
                                    People Associated with this Account
                                </Typography>
                            </ListItem>
                            

                            <Paper style={{maxHeight: 500, overflow: 'auto', alignItems: 'center'}}>
                                    <List>
                                        {
                                            users.length !== 0 ?(
                                                <Fragment>

                                                {users.map(user => (

                                                    <ListItem sx={{border: 1}}>
                                                        <List>
                                                            <ListItem>
                                                                <PersonIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={user.fullName} />
                                                            </ListItem>
                                                            <ListItem>
                                                                <AlternateEmailOutlinedIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={`${user.userName}`} />
                                                            </ListItem>
                                                            <ListItem>
                                                                <CakeIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={`${user.birthDate}`} />
                                                            </ListItem>
                                                        </List>
                                                    </ListItem>
                                                ))}


                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                                                           
                                                    <ListItem sx={{mb: 1, mt: 1}}>
                                                        <Typography  style={{margin: 'auto'}} fontSize={17} >
                                                            There are no associated users
                                                        </Typography>
                                                    </ListItem> 
                                                </Fragment>
                                            )

                                        }

                                        
                                   
                                    </List>
                                </Paper>  

                                <ListItem sx={{mt: 3}}>
                                    <Button style={{margin: 'auto'}} color="secondary" variant="contained" onClick={openBox} >
                                        Add New Person
                                    </Button>
                                </ListItem>
                        </List>

                    </Box>
                </Paper>
            </Fragment>
            )

        } else {

                    
            people = (
                <Fragment>
                    <NoMatch/>
                </Fragment>
            )
        }


    } else {

            people = (

                <div style={{margin: 'auto'}}>
                    <CircularProgress color="secondary" size={200} thickness={1} sx={{overflow: 'auto', position: 'relative', m: 7}} />
                </div>
            
            )

    }


    if (dashboard !== 'users'){
        return (
            <Fragment></Fragment>
        )
    }

    return people

}

Users.propTypes = {
    openAddUserBox: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    openAddUserBox
}

export default connect(mapStateToProps, mapActionsToProps) (Users);




