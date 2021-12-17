
import React, { Fragment, useEffect, useState} from 'react';
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
//Redux
import {connect} from 'react-redux';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import {closeAddUserBox, addNewUserFromAccount, setClearStateNewUserFalse} from '../../redux/actions/userActions';
const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px',
}

let AddUser = (props) =>  {

    
    const {user: {client} } = props;
    const {UI: {addUserWindowOpen, loading, cleanStateNewUser}} = props;

    useEffect(()=> {

        if (cleanStateNewUser){
            clearState()
            props.setClearStateNewUserFalse()
        }

    }, [cleanStateNewUser])


    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [birthDate, setBirthDate] = useState('')


    let useTrait = (initialValue) => {
   
        let [errors, setErrors] = useState(initialValue);
     
        let current = errors;
     
        const get = () => current;
     
        const set = newValue => {
           current = newValue;
           setErrors(newValue);
           return current;
        }
     
        return {
           get,
           set,
        }
    }
    let errors = useTrait({errors: props.UI.errors})
    useEffect(()=> {
        if (props.UI.errors){
            errors.set(props.UI.errors)            
        }
    }, [props.UI.errors])


    let clearState = () => {
        setFullName('')
        setUserName('')
        setBirthDate('')
        errors.set('')  
    }

    let closeWindow = () => {
        clearState()
        
        props.closeAddUserBox()
    }

    let handleChange = (event) => {
        if (event.target.name === 'birthDate'){
            setBirthDate(event.target.value)
        }else if (event.target.name === 'fullName'){
            setFullName(event.target.value)
        }else if (event.target.name === 'userName'){
            setUserName(event.target.value)
        };
    }


    let handleSubmit = (event) => {
        event.preventDefault();
    
        const newUserData = {
            email: client.email, 
            userName: userName,
            fullName: fullName,
            type: 'patient',
            birthDate: birthDate,
            doctor: client.doctor,
            parent: client.userName
            
        }

        props.addNewUserFromAccount(newUserData)

    
    }

    return (
        <Fragment>
               <Dialog open={addUserWindowOpen}  fullWidth maxWidth='sm'>
                   <MyButton tipClassName='closeButton' btnClassName='closeButton' onClick={closeWindow}>
                       <CloseIcon/>
                   </MyButton>
                
                   <DialogTitle style={{textAlign: "center"}}>
                       <Typography  style={{margin: 'auto'}} fontSize={25}>
                           New User
                       </Typography>
                   </DialogTitle>

                   <DialogContent style={{height: 350}} >
                     <Box component="form" onSubmit={handleSubmit}  noValidate  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            autoComplete="full-name"
                            helperText={errors.get().fullName}
                            error={errors.get().fullName ? true : false} 
                            value={fullName} 
                            onChange={handleChange}
                            
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            autoComplete="user-name"
                            name="userName"
                            helperText={errors.get().userName}
                            error={errors.get().userName ? true : false} 
                            value={userName} 
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            autoComplete="birth-date"
                            id="birthDate"
                            name="birthDate"
                            label="Date of Birth"
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                            helperText={errors.get().birthDate}
                            error={errors.get().birthDate ? true : false} 
                            value={birthDate} 
                            onChange={handleChange}
                        />
                        
                        {errors.get().general && (
                            <Typography variant="body2" style={customError} justifyContent="center">
                                {errors.get().general}
                            </Typography>
                        )}
                        
                        <ListItem sx={{mt: 3}}>
                            <Button 
                                style={{margin: 'auto'}} 
                                color="secondary" 
                                variant="contained"
                                type="submit"
                            >
                                {!loading ? 'Add Person': <CircularProgress size={20} color="inherit" />}
                            </Button>
                        </ListItem>  
                         
                    </Box>
                          
                   </DialogContent>
               </Dialog>
       </Fragment>
   )
}

AddUser.propTypes = {
    setClearStateNewUserFalse: PropTypes.func.isRequired,
    addNewUserFromAccount: PropTypes.func.isRequired,
    closeAddUserBox: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   user: state.user,
   UI: state.UI
})

const mapActionsToProps = {
    closeAddUserBox,
    addNewUserFromAccount,
    setClearStateNewUserFalse
}

export default connect(mapStateToProps, mapActionsToProps) (AddUser);



