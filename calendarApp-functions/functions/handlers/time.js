
const {  db } = require('../util/admin');

const { firestore } = require('firebase-admin');

exports.getDoctorAvailableTime = (req, res) => {
    let doctor = req.params.doctor;

    let time = {}

    let appointments = []

    db.doc(`/time/${doctor}`).get()
    .then((doc) => {
        if (doc.exists){
            time = doc.data()
        } else {
            time = {}     
        }   

        return db.collection('appointments').where('doctor.userName', '==', doctor).get()
       
    })
    .then(data => {
        if (data.empty){
            appointments = []
        } else {
            data.forEach(element => {
                appointments.push(element.data())
            })
        }

        return res.json({
            time: time,
            appointments: appointments
        })
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({error: err.code})
    })
}

exports.updateWorkingHours = (req, res) => {
        
    let doctor = req.user.userName;

    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    let holidays = req.body.holidays;
    let workingDays = req.body.workingTime;
    let rule = req.body.rule;
    let earliestDay = req.body.earliestDay;

    db.collection('time').doc(`${doctor}`).update({
        "workingDays": workingDays,
        "holidays": holidays, 
        "rule": rule,
        "earliestDay": earliestDay
    })
    .then(()=> {
        return res.status(201).json({message: "Working time successfully updated"})
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })

}


exports.updateWorkingTime = (req, res) => {
    
    let doctor = req.user.userName;

    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    let workingDays = {
        monday: req.body.monday? req.body.monday:null, 
        tuesday: req.body.tuesday? req.body.tuesday: null,
        wednesday: req.body.wednesday? req.body.wednesday: null,
        thursday: req.body.thursday? req.body.thursday: null,
        friday: req.body.friday? req.body.friday: null,
        saturday: req.body.saturday? req.body.saturday:null,
        sunday: req.body.sunday? req.body.sunday:null,
    }

    db.collection('time').doc(`${doctor}`).update({
        "workingDays": workingDays
    })
    .then(()=> {
        return res.status(201).json({message: "Working time successfully updated"})
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })

}

exports.updateHolidays = (req, res) => {
    let holidays = req.body.holidays

    let doctor = req.user.userName;

    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    db.collection('time').doc(`${doctor}`).update({
        "holidays": holidays
    })
    .then(()=> {
        return res.status(201).json({message: "List of holidays successfully updated"})
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })
}

exports.updateDaytToCancelBeforeAppointment = (req, res) => {
    let rule = req.body.rule

    let doctor = req.user.userName;

    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    db.collection('time').doc(`${doctor}`).update({
        "rule": rule
    })
    .then(()=> {
        return res.status(201).json({message: "Rule successfully updated"})
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })
}

exports.updateReservedTime = (req, res) => {
    
    let doctor = req.user.userName;

    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    let item = req.body.item;
    
    db.collection('time').doc(`${doctor}`).update({
        reserved: firestore.FieldValue.arrayUnion(item)
    })
    .then(()=> {
        return res.status(201).json({message: "success"})
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })
}

exports.deleteReservedTime = (req, res) => {

    let doctor = req.user.userName;

    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    let data = {
        start: req.params.start, 
        end: req.params.end, 
        age: parseInt(req.params.age), 
        type: req.params.type
    }

    db.collection('time').doc(`${doctor}`).update({
        reserved: firestore.FieldValue.arrayRemove(data)
    })
    .then(()=> {
        return res.status(201).json({message: "Item successfully deleted"})
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })
}



