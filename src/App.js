import React from 'react';
import './App.css';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import axios from 'axios';

// old Redirect is useNavigate, old Switch is Routes
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// Navigation
import NavBar from './components/layout/Navbar'

// MUI
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import Box from '@mui/material/Box'
//Pages
import Welcome from './pages/welcome';
import Login from './pages/login';
import SignUpDoctor from './pages/signupDoctor';
import SignUpPatient from './pages/signupPatient';

import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import LoginRoute from './util/LoginRoute';
import NoMatch from './util/NoMatch';
// temporary
import Dashboard from './pages/dashboard';

let theme = createTheme({
  
  palette: {
    primary: {
      main: '#b2ebf2',
      // black
      contrastText: '#006064'
    },
    secondary: {
      main: '#ef5350',
      // red dark
      contrastText: '#fff'
    }
  }
  
})



const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href='/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="container">
      <Provider store={store}>
          <Router>
            <NavBar/>
              <Routes>
                <Route element={<AuthRoute/>}>
                  <Route exact path="/" element={<Welcome/>} />
                  <Route exact path="/patient" element={<SignUpPatient/>}/>
                  <Route exact path="/professional" element={<SignUpDoctor/>}/>
                  <Route exact path="/login" element={<Login/>}/>
                </Route>
        
                <Route element={<LoginRoute/>}>
                  <Route exact path="/home" element={<Dashboard/>}/>
                  <Route exact path="/appointment" element={<Dashboard/>}/>
                  <Route exact path="/patients" element={<Dashboard/>}/>
                  <Route exact path="/profile" element={<Dashboard/>}/>
                  <Route exact path="/users" element={<Dashboard/>}/>
                  <Route exact path="/professionals" element={<Dashboard/>}/>  
                  <Route exact path="/profile/workingtime" element={<Dashboard/>}/>
                  <Route exact path="/home/appointments/:id" element={<Dashboard/>}/>
                </Route>
         
                <Route path='*' element={<NoMatch/>} />

              </Routes>
          
          </Router>
      </Provider>
      </Box>
    </ThemeProvider>

  );
}

export default App;
