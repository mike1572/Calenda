

import { 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    STOP_LOADING_UI, 
    SET_OPEN_TRUE, 
    SET_OPEN_FALSE,
    SET_APPOINTMENT_ID,
    SET_APPOINTMENT_ID_NULL,

    DASHBOARD_HOME,
    DASHBOARD_APPOINTMENT,
    DASHBOARD_PATIENTS,
    DASHBOARD_PROFESSIONALS,
    DASHBOARD_PROFILE,
    DASHBOARD_USERS,

    SET_WORKING_OPEN_TRUE,
    SET_WORKING_OPEN_FALSE,

    SET_LOADING_UPDATE_WORK_TRUE,
    SET_LOADING_UPDATE_WORK_FALSE,

    SET_CANCEL_LOADING_TRUE,
    SET_CANCEL_LOADING_FALSE,

    ADD_PROF_TRUE,
    ADD_PROF_FALSE, 

    SET_RESERVE_WINDOW_FALSE,
    SET_RESERVE_WINDOW_TRUE,

    LOADING_RESERVE_TRUE, 
    LOADING_RESERVE_FALSE,

    SET_REMOVE_LOADING_TRUE,
    SET_REMOVE_LOADING_FALSE,

    OPEN_ADD_USER_BOX,
    CLOSE_ADD_USER_BOX,

    CLEAR_STATE_NEW_USER_FALSE,
    CLEAR_STATE_NEW_USER_TRUE,

    LOADING_ADD_APP_TRUE,
    LOADING_ADD_APP_FALSE,

    OPEN_CALENDAR_ADD_APP,
    CLOSE_CALENDAR_ADD_APP,

    OPEN_SCHEDULE_DIALOG,
    CLOSE_SCHEDULE_DIALOG,

    LOADING_SCHEDULE_APP_TRUE,
    LOADING_SCHEDULE_APP_FALSE

} from "../types";

const initialState = {
    addProf : false,
    loading: false, 
    errors: null,
    open: false, 
    appointmentId: null,
    dashboard: 'home', 
    workingOpen : false,
    updateWorkLoading: false,
    cancelLoading: false, 
    reserveWindowOpen: false, 
    loadingAddReserve: false,
    loadingRemoveReserve: false,
    addUserWindowOpen: false,
    cleanStateNewUser: false,
    loadingAddApp: false,
    calendarAddAppOpen: false,

    showScheduleAppDialog: false, 
    scheduleApp: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case LOADING_SCHEDULE_APP_FALSE: {
            return {
                ...state, 
                scheduleApp: false
            }
        }
        case LOADING_SCHEDULE_APP_TRUE: {
            return {
                ...state,
                scheduleApp: true
            }
        }
        case OPEN_SCHEDULE_DIALOG: 
            return {
                ...state, 
                showScheduleAppDialog: true
            }
        case CLOSE_SCHEDULE_DIALOG: 
            return {
                ...state, 
                showScheduleAppDialog: false
            }

        case OPEN_CALENDAR_ADD_APP: 
            return {
                ...state,
                calendarAddAppOpen: true
            }
        case CLOSE_CALENDAR_ADD_APP: 
            return {
                ...state,
                calendarAddAppOpen: false
            }

        case LOADING_ADD_APP_TRUE: 
            return {
                ...state, 
                loadingAddApp: true
            }
        case LOADING_ADD_APP_FALSE: 
            return {
                ...state, 
                loadingAddApp: false
            }
        case CLEAR_STATE_NEW_USER_TRUE: 
            return {
                ...state, 
                cleanStateNewUser: true
            }
        case CLEAR_STATE_NEW_USER_FALSE:
            return {
                ...state, 
                cleanStateNewUser: false
            }
        case OPEN_ADD_USER_BOX: 
            return {
                ...state, 
                addUserWindowOpen: true
        }
        case CLOSE_ADD_USER_BOX:
            return {
                ...state,
                addUserWindowOpen: false
            }
        case SET_REMOVE_LOADING_FALSE:
            return {
                ...state, 
                loadingRemoveReserve: false
            }
        case SET_REMOVE_LOADING_TRUE:
            return {
                ...state, 
                loadingRemoveReserve: true
            }
        case LOADING_RESERVE_TRUE: 
            return {
                ...state, 
                loadingAddReserve: true
            }
        case LOADING_RESERVE_FALSE: 
            return {
                ...state, 
                loadingAddReserve: false
            }
        case SET_RESERVE_WINDOW_TRUE: 
            return {
                ...state, 
                reserveWindowOpen: true
            }
        case SET_RESERVE_WINDOW_FALSE: 
            return {
                ...state, 
                reserveWindowOpen: false
            }
        case ADD_PROF_TRUE:
            return {
                ...state, 
                addProf: true
            }
        case ADD_PROF_FALSE:
            return {
                ...state, 
                addProf: false
            }
        case SET_CANCEL_LOADING_TRUE: 
            return {
                ...state, 
                cancelLoading: true
            }
        case SET_CANCEL_LOADING_FALSE: 
            return {
                ...state, 
                cancelLoading: false
            }
        case SET_LOADING_UPDATE_WORK_TRUE: 
            return {
                ...state, 
                updateWorkLoading: true
            }
        case SET_LOADING_UPDATE_WORK_FALSE: 
            return {
                ...state, 
                updateWorkLoading: false
            }
        case SET_WORKING_OPEN_TRUE: 
            return {
                ...state,
                workingOpen: true
            }
        case SET_WORKING_OPEN_FALSE: 
            return {
                ...state,
                workingOpen: false
            }
        case SET_ERRORS:
            return {
                ...state, 
                loading: false, 
                errors: action.payload
            }
        case CLEAR_ERRORS : 
            return {
                ...state, 
                loading: false, 
                errors: null
            }
        case LOADING_UI: 
            return {
                ...state, 
                loading: true
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        case SET_OPEN_TRUE: 
            return {
                ...state, 
                open: true
            }
        case SET_OPEN_FALSE: 
            return {
                ...state, 
                open: false
            }
        case SET_APPOINTMENT_ID:
            return {
                ...state, 
                appointmentId: action.payload
            }
        case SET_APPOINTMENT_ID_NULL:
            return {
                ...state,
                appointmentId: null
            }
        case DASHBOARD_HOME: 
            return {
                ...state, 
                dashboard: 'home'
            }
        case DASHBOARD_APPOINTMENT: 
            return {
                ...state, 
                dashboard: 'appointment'
            }
        case DASHBOARD_USERS: 
            return {
                ...state, 
                dashboard: 'users'
            }
        case DASHBOARD_PROFILE: 
            return {
                ...state, 
                dashboard: 'profile'
            } 
        case DASHBOARD_PROFESSIONALS: 
            return {
                ...state, 
                dashboard: 'professionals'
            }   
        case DASHBOARD_PATIENTS: 
            return {
                ...state, 
                dashboard: 'patients'
            }          
        default: 
            return state

    }
}
