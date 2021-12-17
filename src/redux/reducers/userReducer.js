
import { 
    SET_USER, 
    LOADING_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    MARK_NOTIFICATIONS_READ,
    LOADING_APPOINTMENTS, 
    SET_APPOINTMENTS,

    SET_EARLIEST_DAY,
    SET_RESERVE_TIME, 
    SET_HOLIDAYS,
    SET_WORKING_TIME_SU,
    SET_WORKING_TIME_SA,
    SET_WORKING_TIME_F,
    SET_WORKING_TIME_TR,
    SET_WORKING_TIME_W,
    SET_WORKING_TIME_T,
    SET_WORKING_TIME_M,
    SET_RULE, 

    SET_WORK_ZERO,

    REMOVE_APPOINTMENT,
    ADD_APPOINTMENT,

    UPDATE_TIME_HWER,
    ADD_DOCTOR_TO_LIST,

    SET_RESERVED_TIME,
    REMOVE_RESERVED_TIME,

    ADD_USER_TO_STATE,

    SET_AVAILABLE_SLOTS,
    CLEAR_AVAILABLE_SLOTS,

    SET_SELECTED_TIME_SLOT,
    CLEAR_SELECTED_TIME_SLOT

} from "../types";

const initialState = {
    authenticated: false, 
    notifications: [],
    loading: false,
    appointmentsLoading: false,
    client: {},
    workingTime: {
        Monday : [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    },
    holidays: null, 
    reserveTime: [],
    rule: 3,
    earliestDay: 7, 
    availableTimeSlots: [],
    selectedTimeSlot: {},
    appointments: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case SET_SELECTED_TIME_SLOT: {
            return {
                ...state, 
                selectedTimeSlot: action.payload
            }
        }
        case CLEAR_SELECTED_TIME_SLOT: {
            return {
                ...state, 
                selectedTimeSlot: {}
            }
        }
        case SET_AVAILABLE_SLOTS: {
            return {
                ...state, 
                availableTimeSlots: action.payload
            }
        }
        case CLEAR_AVAILABLE_SLOTS: {
            return {
                ...state, 
                availableTimeSlots: []
            }
        }
        case ADD_USER_TO_STATE: {
            return {
                ...state, 
                users: [
                    ...state.users, 
                    {
                        userName: action.payload.userName,
                        email: action.payload.email, 
                        fullName: action.payload.fullName,
                        type: action.payload.type,
                        birthDate: action.payload.birthDate,
                        doctor: action.payload.doctor,
                        parent: action.payload.parent
                    }
                ]
            }
        }
        case REMOVE_RESERVED_TIME: 
            return {
                ...state,
                time: {
                    ...state.time, 
                    reserved: state.time.reserved.filter(element => element !== action.payload)
                }
            }
        case SET_RESERVED_TIME: 
        return {
            ...state,
            time: {
                ...state.time, 
                reserved: [
                    ...state.time.reserved, 
                    {
                        start: action.payload.start, 
                        end: action.payload.end, 
                        type: action.payload.type, 
                        age: action.payload.age
                    }
                    
                ] 
            }
        }
        case ADD_DOCTOR_TO_LIST: 

            state.users.forEach((user) => (user.doctor.push(
                {   
                    userName: action.payload.doctor.userName, 
                    fullName: action.payload.doctor.fullName
                }
            )));

            return{
                ...state,
                client: {
                    ...state.client, 
                    doctor: [
                        ...state.client.doctor,
                        {   
                            userName: action.payload.doctor.userName, 
                            fullName: action.payload.doctor.fullName
                        }
                    ]
                }       
            }
        case UPDATE_TIME_HWER: 
            
            return {
                ...state, 
                time: {
                    ...state.time, 
                    holidays: action.payload.holidays, 
                    workingDays: action.payload.workingTime, 
                    earliestDay: action.payload.earliestDay, 
                    rule: action.payload.rule, 
                }
                
            }
        case REMOVE_APPOINTMENT:
            return {
                ...state, 
                appointments: state.appointments.filter(element => element.id !== action.payload)
            }
        case ADD_APPOINTMENT: 
            return {
                ...state,
                appointments: [
                    ...state.appointments, 
                    action.payload
                ]
            }
        case SET_AUTHENTICATED:
            return {
                ...state, authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        case LOADING_USER: 
            return {
                ...state, 
                loading: true
            }
        case SET_USER: 
            return {
                ...state,
                loading: false,
                authenticated: true, 
                ...action.payload
            }
        case MARK_NOTIFICATIONS_READ: 
            state.notifications.forEach((not) => (not.read = true));
            return {
                ...state
            }
        case LOADING_APPOINTMENTS: 
            return{
                ...state, 
                appointmentsLoading: true
            }
        case SET_APPOINTMENTS:
            return {
                ...state, 
                appointmentsLoading: false, 
                ...action.payload
            }

        case SET_WORKING_TIME_M: 
            return {
                ...state, 
                workingTime: {
                    ...state.workingTime,
                    Monday: [...state.workingTime.Monday, action.payload]}
            }
        case SET_WORKING_TIME_T: 
            return {
                ...state, 
                workingTime: {
                    ...state.workingTime,
                    Tuesday: [...state.workingTime.Tuesday, action.payload]}
            }
        case SET_WORKING_TIME_W: 
            return {
                ...state, 
                workingTime: {
                    ...state.workingTime,
                    Wednesday: [...state.workingTime.Wednesday, action.payload]}
            }
        case SET_WORKING_TIME_TR: 
            return {
                ...state, 
                workingTime: {
                    ...state.workingTime,
                    Thursday: [...state.workingTime.Thursday, action.payload]}
            }
        case SET_WORKING_TIME_F: 
            return {
                ...state, 
                workingTime: {
                    ...state.workingTime,
                    Friday: [...state.workingTime.Friday, action.payload]}
            }
        case SET_WORKING_TIME_SA: 
            return {
                ...state, 
                workingTime: {
                    ...state.workingTime,
                    Saturday: [...state.workingTime.Saturday, action.payload]}
            }
        case SET_WORKING_TIME_SU: 
            return {
                ...state, 
                workingTime: {
                    ...state.workingTime,
                    Sunday: [...state.workingTime.Sunday, action.payload]}
            }
        case SET_RULE: {
            return {
                ...state, 
                rule: action.payload
            }
        }
        case SET_EARLIEST_DAY: {
            return {
                ...state,
                earliestDay: action.payload
            }
        }
        case SET_HOLIDAYS: 
            return {
                ...state, 
                holidays: action.payload
            }
        case SET_WORK_ZERO: 
            return {
                ...state, 
                workingTime: {
                    Monday : [],
                    Tuesday: [],
                    Wednesday: [],
                    Thursday: [],
                    Friday: [],
                    Saturday: [],
                    Sunday: []
                },
                holidays: null, 
                rule: null,
                earliestDay: null
            }
        case SET_RESERVE_TIME: 
            return {
                ...state, 
                reserveTime: action.payload
            }
        default: 
            return state;
    }
}


