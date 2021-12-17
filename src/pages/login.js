
import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import { loginUser } from "../redux/actions/userActions";

import Org from '../images/org.jpg';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom';

const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px',
    
}

let Login = (props) => { 
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

    const { UI: { loading } } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
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
        };
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
    
        const data = {
            email: email, 
            password: password
        }

        
        props.loginUser(data, navigate)

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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            helperText={errors.get().email}
                            error={errors.get().email ? true : false} 
                            value={email} 
                            onChange={handleChange} 
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={errors.get().password}
                            error={errors.get().password ? true : false} 
                            value={password} 
                            onChange={handleChange} 
                        />
                        <Typography variant="body2" style={customError}>
                            {errors.get().general}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                           
                        >
                        {loading ? 
                            (<CircularProgress size={20} color="inherit" />): ('Log In')
                        }
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <small>Don't have an account? Sign up <Link to="/patient">here</Link> for patients and  <Link to="/professional">here</Link> for professionals</small>
                            </Grid>
                        </Grid>
             
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </Fragment>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps) (Login);
