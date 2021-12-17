const functions = require('firebase-functions');

const express = require('express');

const app = express();
const middle  = require('./handlers/middle')
const cors = require('cors')
app.use(cors())

const {db} = require('./util/admin')

const { 
    getClientData, 
    getAllPatientsPerDoctor, 
    getAllClientsLinkedToAccount, 
    getAllDoctors, 
    getPatientGeneralInfo, 
    addUsersWithoutAccounts, 
    markNotificationsRead
} = require('./handlers/clients');

const { 
    getAllAppointmentsForToday, 
    getAllFamilyAppointments, 
    getAllAppointmentsOfDoctor, 
    patientBookAppointmentForHimSelf,
    doctorBookAppointmentForPatient,
    cancelAppointment,
    addDoctor
} = require('./handlers/appointments')

const {
    signupPatient, 
    signupDoctor, 
    login
} = require('./handlers/signup');

const {
    getDoctorAvailableTime,
    updateWorkingTime,
    updateHolidays, 
    updateReservedTime, 
    deleteReservedTime,
    updateDaytToCancelBeforeAppointment,
    updateWorkingHours
} = require('./handlers/time')



// add doctor 
app.post('/newdoctor', middle, addDoctor)

// for patients
app.get('/user', middle, getClientData)

// for doctors
app.get('/user/:info', middle, getPatientGeneralInfo)


app.get('/appointmentstoday', middle, getAllAppointmentsForToday)

// for doctors
app.get('/allappointmentsofdoctor', middle, getAllAppointmentsOfDoctor)

app.get('/appointments', middle, getAllFamilyAppointments)

app.get('/patients', middle, getAllPatientsPerDoctor)
app.get('/clients', middle, getAllClientsLinkedToAccount)
app.get('/doctors', middle, getAllDoctors)

//book appointment
app.post('/bookAppointment', middle, patientBookAppointmentForHimSelf);
app.post('/bookAppointmentforPatient', middle, doctorBookAppointmentForPatient)

// cancel appointment
app.delete('/cancelAppointment/:id', middle, cancelAppointment)

//add users
app.post('/adduserfromaccount', middle, addUsersWithoutAccounts)

// signup 
app.post('/signuppatient', signupPatient);
app.post('/signupdoctor', signupDoctor);

app.post('/login', login);

// time
app.get('/time/:doctor', middle, getDoctorAvailableTime)
app.post('/updateworkingtime', middle, updateWorkingTime)
app.post('/updatework', middle, updateWorkingHours);

app.post('/updateholidays', middle, updateHolidays)

app.post('/updatereservedtime', middle, updateReservedTime)
app.delete('/deletereservedtime/:start/:end/:age/:type', middle, deleteReservedTime)
app.post('/notifications', middle, markNotificationsRead)
app.post('/rule', middle, updateDaytToCancelBeforeAppointment)

exports.api = functions.https.onRequest(app)

exports.createNotificationOnSignedUp = functions.region('us-central1').firestore.document('users/{id}')
.onCreate((snapshot)=> {
    return db.doc(`/users/${snapshot.data().userName}`).get()
    .then((doc)=> {
        // if doc from user
        if (doc.exists && doc.data().userName === snapshot.data().userName ){
            return db.doc(`/notifications/${doc.data().userId}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userName,
                sender: 'system',
                type: doc.data().type,
                read: false
            })
        }
    })
    .catch((err)=> {
        console.error(err);
        return;
    })
})

exports.createNotificationOnBookingAppointment = functions.region('us-central1').firestore.document('appointments/{id}')
.onCreate((snapshot)=> {
    return db.doc(`/appointments/${snapshot.id}`).get()
    .then(doc=> {

        if (doc.exists){

            let recipient = doc.data().doctor.userName
            let sender = doc.data().parent

            if (doc.data().bookedBy === doc.data().doctor.userName){
                sender = doc.data().doctor.userName
                recipient = doc.data().parent

            }

            db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: recipient,
                sender: sender,
                type: 'appointment',
                read: false,
                start: snapshot.data().start,
                end: snapshot.data().end,
                participants: snapshot.data().participants
            })

            db.doc(`/notifications/inv${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: sender,
                sender: recipient,
                type: 'appointment',
                read: false,
                start: snapshot.data().start,
                end: snapshot.data().end,
                participants: snapshot.data().participants
            })

        }
    })
    .catch((err)=> {
        console.error(err);
        return;
    })
})

exports.createNotificationOnCancelledAppointment = functions.region('us-central1')
.firestore.document('appointments/{id}')
.onDelete((snapshot)=> {
    
    db.doc(`/notifications/${snapshot.id}`).delete()
    .then(()=> {
        db.doc(`/notifications/inv${snapshot.id}`).delete()
    })
    .then(()=> {
        db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: snapshot.data().doctor.userName,
            sender: snapshot.data().parent,
            type: 'cancel',
            read: false,
            start: snapshot.data().start,
            participants: snapshot.data().participants,
            end: snapshot.data().end,
        })        
    })
    .then(()=> {
        db.doc(`/notifications/inv${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: snapshot.data().parent,
            sender: snapshot.data().doctor.userName,
            type: 'cancel',
            read: false,
            start: snapshot.data().start,
            participants: snapshot.data().participants,
            end: snapshot.data().end,
        })   
    })
    .catch((err)=> {
        console.error(err)
        return;
    })
})







