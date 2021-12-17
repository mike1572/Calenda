
import React, { useState, Fragment, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import { signupUser } from "../redux/actions/userActions";

import Org from '../images/off.jpg';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'

const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px',
}

let SignUpPatient = (props) => {
    
    const { UI: { loading } } = props;

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
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
    let navigate = useNavigate()
    useEffect(()=> {
   
        if (props.UI.errors){
            errors.set(props.UI.errors)            
        }

           
    }, [props.UI.errors])
    

    let handleChange = (event) => {
        if (event.target.name === 'email'){
            setEmail(event.target.value)
        } else if (event.target.name === 'password'){
            setPassword(event.target.value)
        } else if (event.target.name=== 'confirmPassword'){
            setConfirmPassword(event.target.value)
        } else if (event.target.name === 'birthDate'){
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
            email: email, 
            password: password, 
            confirmPassword: confirmPassword,
            userName: userName,
            fullName: fullName,
            type: 'patient',
            birthDate: birthDate,
            doctor: []
            
        }

        props.signupUser(newUserData, navigate)

    }
    
    return (
        <Fragment>
        <Grid container component="main" sx={{ height: '90vh'}}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${Org})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: 'solid black 1px' 
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Typography component="h2" variant="h6">
                        Create account as patient
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}  noValidate  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            autoComplete="full-name"
                            label="Full Name"
                            name="fullName"
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
                            autoComplete="user-name"
                            label="User Name"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            helperText={errors.get().email}
                            error={errors.get().email ? true : false} 
                            value={email} 
                            onChange={handleChange}
                            
                        />
                        <TextField
                            autoComplete="selected-password"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            helperText={errors.get().password}
                            error={errors.get().password ? true : false} 
                            value={password} 
                            onChange={handleChange}
                            
                            
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="confirm-password"
                            id="confirmPassword"
                            helperText={errors.get().confirmPassword}
                            error={errors.get().confirmPassword ? true : false} 
                            value={confirmPassword} 
                            onChange={handleChange}
                            
                        />
                        
                        {errors.get().general && (
                            <Typography variant="body2" style={customError} justifyContent="center">
                                {errors.get().general}
                            </Typography>
                        )}
                        
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        
                        {loading ? 
                            (<CircularProgress size={20} color="inherit" />): ('Sign Up')
                        }
             
                        </Button>
             
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </Fragment>
    )
}

SignUpPatient.propTypes = {
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps) (SignUpPatient);

