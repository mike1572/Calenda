import React, {useState, Fragment, useEffect} from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import { signupUser } from "../redux/actions/userActions";

import Org from '../images/work.jpg';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';

//import countries from '../ressources/countries';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select'
import CircularProgress from '@mui/material/CircularProgress'

import Holidays from 'date-holidays';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px',
}

let SignUpDoctor = (props) => {

    let hd = new Holidays();
   
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
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState("");
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    
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
        } else if (event.target.name === 'country'){
            setCountry(event.target.value)
        }else if (event.target.name === 'region'){
            setRegion(event.target.value)
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
            type: 'doctor',
            country: country, 
            region: region
            
        }

        props.signupUser(newUserData, navigate)

    }
 


    let items = (countries) => {

        let rows = []
    
        for (const [key, value] of Object.entries(countries)) {
    
            rows.push
            (

                <MenuItem
                    name="country"
                    value={key}
                    key={key}>
                    {value}
                </MenuItem>
                
            )
        
        } 

        return rows
       
    }

    let provinces = (states) => {
        let provinces = []


        if (states !== null && states !== undefined){
            for (const [key, value] of Object.entries(states)) {
        
                provinces.push
                (

                    <MenuItem
                        name="region"
                        value={key}
                        key={key}>
                        {value}
                    </MenuItem>
                    
                )
            
            } 

            return provinces
        }

        return (
            <MenuItem
            name="region"
            value='none'
            key='none'>
            None
            </MenuItem>
        )
   
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
                        Create account as professional
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="full-name"
                            id="fullName"
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
                            required
                            fullWidth
                            id="email"
                            autoComplete="email"
                            label="Email Address"
                            name="email"
                            type="email"
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
                            autoComplete="chosen-password"
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
                        
                        <FormControl required fullWidth margin="normal" >
                            <InputLabel id="country">Country</InputLabel>

                            <Select
                                value={country}
                                name="country"
                                id="country"
                                MenuProps={MenuProps}
                                error={errors.get().country ? true : false} 
                                value={country} 
                                onChange={handleChange}
                            >
                                {items(hd.getCountries())} 
                                

                            </Select>
                            <FormHelperText>{errors.get().country}</FormHelperText>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel id="region">Province/State</InputLabel>
                            <Select
                                name="region"
                                id="region"
                                value={region}
                                error={errors.get().region ? true : false} 
                                value={region} 
                                onChange={handleChange}
                                disabled={!country}
                            >
                            {provinces(hd.getStates(country))}
                            </Select>
                            <FormHelperText>{errors.get().region}</FormHelperText>
                        </FormControl>
                        
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

SignUpDoctor.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps) (SignUpDoctor);



