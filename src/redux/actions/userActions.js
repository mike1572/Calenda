
import {parseISOString, isInTheRange, doesNotOverlap, weekday} from '../../ressources/useful'
import axios from "axios";
import Holidays from 'date-holidays';
import { 
    SET_USER, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    LOADING_USER, 
    SET_UNAUTHENTICATED,
    SET_OPEN_FALSE, 
    SET_OPEN_TRUE, 
    MARK_NOTIFICATIONS_READ,
    LOADING_APPOINTMENTS,
    SET_APPOINTMENTS,
    SET_APPOINTMENT_ID,
    SET_APPOINTMENT_ID_NULL,

    DASHBOARD_HOME,
    DASHBOARD_APPOINTMENT,
    DASHBOARD_PATIENTS,
    DASHBOARD_PROFESSIONALS,
    DASHBOARD_PROFILE,
    DASHBOARD_USERS,

    SET_RULE,
    SET_EARLIEST_DAY,

    SET_WORKING_TIME_M,
    SET_WORKING_TIME_T,
    SET_WORKING_TIME_W,
    SET_WORKING_TIME_TR,
    SET_WORKING_TIME_F,
    SET_WORKING_TIME_SA,
    SET_WORKING_TIME_SU,

    SET_WORKING_OPEN_TRUE,
    SET_WORKING_OPEN_FALSE,
    SET_WORK_ZERO,

    SET_HOLIDAYS,

    SET_LOADING_UPDATE_WORK_TRUE, 
    SET_LOADING_UPDATE_WORK_FALSE, 

    SET_CANCEL_LOADING_TRUE,
    SET_CANCEL_LOADING_FALSE,
    REMOVE_APPOINTMENT,
    UPDATE_TIME_HWER,
    ADD_DOCTOR_TO_LIST,
    ADD_PROF_TRUE,
    ADD_PROF_FALSE, 

    SET_RESERVE_WINDOW_TRUE, 
    SET_RESERVE_WINDOW_FALSE,

    SET_RESERVED_TIME,

    LOADING_RESERVE_TRUE,
    LOADING_RESERVE_FALSE,

    SET_REMOVE_LOADING_TRUE,
    SET_REMOVE_LOADING_FALSE,
    REMOVE_RESERVED_TIME,

    OPEN_ADD_USER_BOX,
    CLOSE_ADD_USER_BOX,

    ADD_USER_TO_STATE,

    CLEAR_STATE_NEW_USER_FALSE,
    CLEAR_STATE_NEW_USER_TRUE,

    LOADING_ADD_APP_TRUE,
    LOADING_ADD_APP_FALSE,

    ADD_APPOINTMENT,

    OPEN_CALENDAR_ADD_APP,
    CLOSE_CALENDAR_ADD_APP,

    CLEAR_AVAILABLE_SLOTS,
    SET_AVAILABLE_SLOTS,

    CLOSE_SCHEDULE_DIALOG,
    OPEN_SCHEDULE_DIALOG,

    CLEAR_SELECTED_TIME_SLOT,
    SET_SELECTED_TIME_SLOT,

    LOADING_SCHEDULE_APP_FALSE,
    LOADING_SCHEDULE_APP_TRUE

} from "../types";

export const patientBookAppointment = (participants, email, doctor, start, end) => (dispatch) => {

    dispatch({
        type: LOADING_SCHEDULE_APP_TRUE
    })

    let data = {
        participants: participants, 
        email: email, 
        doctor: doctor, 
        start: start, 
        end: end
    }

    axios.post('/bookAppointment', data)
    .then((res)=> {

        data.bookedBy = res.data.bookedBy
        data.id = res.data.id
        data.parent = res.data.parent
        dispatch({
            type: LOADING_ADD_APP_FALSE
        })

        dispatch({
            type: ADD_APPOINTMENT,
            payload: data
        })
        
        dispatch({
            type: CLOSE_SCHEDULE_DIALOG
        })
    
        dispatch({
            type: CLEAR_SELECTED_TIME_SLOT
        })

        dispatch({
            type:  CLOSE_CALENDAR_ADD_APP
        })
    
        dispatch({
            type: CLEAR_AVAILABLE_SLOTS
        })
        setDashboard('home')
    })
    .catch((err)=> {
        console.log(err)
     
        dispatch({
            type: LOADING_SCHEDULE_APP_FALSE
        })
    })


}


export const openCalendarDialog = (data) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_TIME_SLOT, 
        payload: data
    })

    dispatch({
        type: OPEN_SCHEDULE_DIALOG
    })
}
 

export const closeCalendarDialog = () => (dispatch) => {
    dispatch({
        type: CLOSE_SCHEDULE_DIALOG
    })

    dispatch({
        type: CLEAR_SELECTED_TIME_SLOT
    })
}


export const closeCalendarApp = () => (dispatch) => {
    dispatch({
        type:  CLOSE_CALENDAR_ADD_APP
    })

    dispatch({
        type: CLEAR_AVAILABLE_SLOTS
    })
}



export const getDoctorAvailabilities = (age, doctor, region, country) => (dispatch) => {

    dispatch({
        type: LOADING_ADD_APP_TRUE
    })


    let hd = new Holidays()

    axios.get(`/time/${doctor}`)
    .then((res)=> {
        let events = [];
        let earliestDay = res.data.time.earliestDay;
        let holidays = res.data.time.holidays;
        let reserved = res.data.time.reserved;
        let workingDays = res.data.time.workingDays;
        let rule = res.data.time.rule;
        let appointments = res.data.appointments;

        hd.init(country, region)

        let today = new Date()
        today.setDate(today.getDate() + earliestDay)

        for (let i = 0; i < rule * 30; i++){
            let next = false;
            let holiday = hd.isHoliday(today)
            if (holiday !== false){
                holidays.forEach(element => {
                    if (element === holiday[0].name){
                        next = true;
                    }
                })
            }
            if(next){
                today.setDate(today.getDate() + 1)
                continue
            }
            let dateInReserved = false
            reserved.forEach(element => {
                if (element.type === 'P' || (element.type === 'F' && age > element.age)){
                    if (isInTheRange(parseISOString(element.start), parseISOString(element.end), today)){
                        dateInReserved = true
                    }
                }
            })
            if (dateInReserved){
                today.setDate(today.getDate() + 1)
                continue
            }
            let dayOfTheWeek = today.getDay()
            workingDays[weekday[dayOfTheWeek]].forEach(element => {
                let start = new Date(today);
                let end = new Date(today);
                start.setHours(element.start.hour, element.start.minutes, 0, 0)
                end.setHours(element.end.hour, element.end.minutes, 0, 0)
                let overlap = false;
                appointments.forEach(app => {
                    if (!doesNotOverlap(parseISOString(app.start), parseISOString(app.end),start, end)){
                        overlap = true
                    }
                })
                if (!overlap){
                    let event = {
                        start: start, 
                        end: end, 
                        title: "Available Time"
                    }
                    events.push(event)
                }
            })
            today.setDate(today.getDate() + 1)

            dispatch({
                type: SET_AVAILABLE_SLOTS,
                payload: events
            })
            dispatch({
                type: OPEN_CALENDAR_ADD_APP
            })

            dispatch({
                type: LOADING_ADD_APP_FALSE
            })


        }
        

    })
    .catch(err => console.log(err))
}




export const docBookAppointment = (participants, start, end, email) => (dispatch) => {

    dispatch({
        type: LOADING_ADD_APP_TRUE    
    })

    let data = {
        email: email, 
        start: start.toISOString(), 
        end: end.toISOString(),
        participants: participants
    }

    axios.post('/bookAppointmentforPatient', data)
    .then((res)=> {

        data.bookedBy = res.data.bookedBy
        data.id = res.data.id
        data.doctor = res.data.doctor
        dispatch({
            type: LOADING_ADD_APP_FALSE
        })

        dispatch({
            type: ADD_APPOINTMENT,
            payload: data
        })

        setDashboard('home')
    })
    .catch((err)=> {
        console.log(err)
        dispatch({
            type: LOADING_ADD_APP_FALSE
        })
    })



}


export const setClearStateNewUserFalse = () => (dispatch) => {
    dispatch({
        type: CLEAR_STATE_NEW_USER_FALSE
    })
}

export const addNewUserFromAccount = (newUserData) => (dispatch) => {

    dispatch({
        type: LOADING_UI
    })

    axios.post('/adduserfromaccount', newUserData)
    .then((res)=> {
        dispatch({ type: CLEAR_ERRORS });
        dispatch({
            type: CLOSE_ADD_USER_BOX
        })
        dispatch({
            type: ADD_USER_TO_STATE,
            payload: newUserData
        })

        dispatch({
            type: CLEAR_STATE_NEW_USER_TRUE
        })

    })
    .catch((err)=> {
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })

}

export const openAddUserBox = () => (dispatch) => {
    dispatch({
        type: OPEN_ADD_USER_BOX
    })
}

export const closeAddUserBox = () => (dispatch) => {
    dispatch({
        type: CLOSE_ADD_USER_BOX
    })
    dispatch({ 
        type: CLEAR_ERRORS 
    });
}


export const removeReservedTime = (item) => (dispatch) => {
    dispatch({
        type: SET_REMOVE_LOADING_TRUE
    })

    
    axios.delete(`/deletereservedtime/${item.start}/${item.end}/${item.age}/${item.type}`)
    .then((res) => {
        dispatch({
            type: REMOVE_RESERVED_TIME,
            payload: item
        })
    
        dispatch({
            type: SET_REMOVE_LOADING_FALSE
        })
    })
    .catch(err => {
        console.log(err)
    })
 


}

export const addReservedTime = (start, end, type, age) => (dispatch) => {

    dispatch({
        type: LOADING_RESERVE_TRUE
    })


    let timeAdded= {
        start: start, 
        end: end, 
        type: type, 
        age: age
    }

    let timeToSend = {
        item : timeAdded
    }

    axios.post('/updatereservedtime', timeToSend)
    .then((res) => {
            
        dispatch({
            type: SET_RESERVED_TIME,
            payload: timeAdded
        })    

        dispatch({
            type: LOADING_RESERVE_FALSE
        })
    
        dispatch({
            type: SET_RESERVE_WINDOW_FALSE
        })

        
    })
    .catch(err => console.log(err))

   
}



export const openReserveWindow = () => (dispatch) => {
    dispatch({
        type: SET_RESERVE_WINDOW_TRUE
    })
}

export const closeReserveWindow = () => (dispatch) => {
    dispatch({
        type: SET_RESERVE_WINDOW_FALSE
    })
}

export const addDocToList = (userName, fullName) => (dispatch) => {
    
    dispatch({
        type: ADD_PROF_TRUE
    })

    let item = {
        doctor:  {
            userName: userName, 
            fullName: fullName
        }
    }
 
    axios.post('/newdoctor', item)
    .then((res) => {
            
        dispatch({
            type: ADD_DOCTOR_TO_LIST, 
            payload: item
        })

        dispatch({
            type: ADD_PROF_FALSE
        })
        
                
    })
    .catch(err => console.log(err))

}

export const setWorkToZero = () => (dispatch) => {
    dispatch({
        type: SET_WORK_ZERO
    })
}

export const setWorkingOpenTrue = () => (dispatch) => {
    dispatch({
        type: SET_WORKING_OPEN_TRUE
    })
}

export const setWorkingOpenFalse = () => (dispatch) => {
    dispatch({
        type: SET_WORKING_OPEN_FALSE
    })
}


export const updateWorkingData = (holidays, workingDays, rule, earliestDay) => (dispatch) => {

    let data = {
        holidays: holidays, 
        workingTime: workingDays, 
        rule: rule, 
        earliestDay: earliestDay
    }
    

    dispatch({
        type: SET_LOADING_UPDATE_WORK_TRUE
    })

    dispatch({
        type: UPDATE_TIME_HWER, 
        payload: data
    })

    axios.post('/updatework', data)
    .then((res) => {
        
        dispatch({
            type: SET_LOADING_UPDATE_WORK_FALSE
        })

        dispatch({
            type: SET_WORK_ZERO
        })
        
    })
    .catch(err => console.log(err))


}

export const setRuleHolidaysAndEarliestDay = (rule, holidays, earliestDay) => (dispatch) => {
    dispatch({
        type: SET_RULE,
        payload: rule
    })
    dispatch({
        type: SET_HOLIDAYS,
        payload: holidays
    })
    dispatch({
        type: SET_EARLIEST_DAY, 
        payload: earliestDay
    })
    
}

export const addWorkingTimeSlot = (day, obj) => (dispatch) => {
    if (day === 'Monday'){
        dispatch({
            type: SET_WORKING_TIME_M,
            payload: obj
        })
    } else if (day === 'Tuesday'){
        dispatch({
            type: SET_WORKING_TIME_T,
            payload: obj
        })
    } else if (day === "Wednesday"){
        dispatch({
            type: SET_WORKING_TIME_W,
            payload: obj
        })
    } else if (day === "Thursday"){
        dispatch({
            type: SET_WORKING_TIME_TR,
            payload: obj
        })
    } else if (day === "Friday"){
        dispatch({
            type: SET_WORKING_TIME_F,
            payload: obj
        })
    } else if (day === "Saturday"){
        dispatch({
            type: SET_WORKING_TIME_SA,
            payload: obj
        })
    } else if (day === "Sunday"){
        dispatch({
            type: SET_WORKING_TIME_SU,
            payload: obj
        })
    }
}


export const setAppointmentId = (id) => (dispatch) => {

    dispatch({
        type: SET_APPOINTMENT_ID, 
        payload: id
    })
}

export const setAppointmentIdToNull = () => (dispatch) => {
    dispatch({
        type: SET_APPOINTMENT_ID_NULL
    })
}


export const setDashboard = (item) => (dispatch) => {
    
    if (item === 'home'){
        dispatch({
            type: DASHBOARD_HOME
        })
    } else if (item === 'appointment') {
        dispatch({
            type: DASHBOARD_APPOINTMENT
        })
    } else if (item === 'patients') {
        dispatch({
            type: DASHBOARD_PATIENTS
        })
    } else if (item === 'profile') {
        dispatch({
            type: DASHBOARD_PROFILE
        })
    } else if (item === 'users') {
        dispatch({
            type: DASHBOARD_USERS
        })
    } else if (item === 'professionals') {
        dispatch({
            type: DASHBOARD_PROFESSIONALS
        })
    } 

}





export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
    .then((res) => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history('/home')
    })
    .catch((err)=> {
        console.log(err)
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    })

}

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER, 
            payload: res.data
        })

    })
    .catch(err => console.log(err))
}

export const cancelAppointment = (id) => (dispatch) => {
    dispatch({
        type: SET_CANCEL_LOADING_TRUE
    })  
    axios.delete(`/cancelAppointment/${id}`)
    .then((res)=> {
        dispatch({
            type: SET_CANCEL_LOADING_FALSE
        })

        dispatch({
            type: REMOVE_APPOINTMENT, 
            payload: id
        })
    
    })
    .catch((err)=> {
        console.log(err)
    })

}



export const getAllAppointmentsOfDoctor = () => (dispatch) => {
    dispatch({type: LOADING_APPOINTMENTS})
    axios.get('/allappointmentsofdoctor')
    .then(res => {
        dispatch({
            type: SET_APPOINTMENTS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    if (newUserData.type === 'doctor') {
        axios.post('/signupdoctor', newUserData)
        .then((res)=> {
            setAuthorizationHeader(res.data.token)
            getUserData()
            dispatch({ type: CLEAR_ERRORS });
            history('/home')
            
        })
        .catch((err)=> {
            dispatch({
                type: SET_ERRORS, 
                payload: err.response.data
            })
        })
    
    } else {
        axios.post('/signuppatient', newUserData)
        .then((res)=> {
            setAuthorizationHeader(res.data.token)
            getUserData()
            dispatch({ type: CLEAR_ERRORS });
            history('/home')
            
        })
        .catch((err)=> {
            dispatch({
                type: SET_ERRORS, 
                payload: err.response.data
            })
        })

    }
    
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios.post(`/notifications`, notificationIds)
        .then((res)=> {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch((err)=> {
            console.log(err)
        })
}



export const openMenu = () => (dispatch) => {
    dispatch({type: SET_OPEN_TRUE})

}


export const closeMenu = () => (dispatch) => {
    dispatch({type: SET_OPEN_FALSE })

}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}




