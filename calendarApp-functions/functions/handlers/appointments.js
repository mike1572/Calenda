

const {  db } = require('../util/admin');


const { firestore } = require('firebase-admin');


exports.addDoctor = (req, res) => {

    let doctor = req.body.doctor;

    if (req.user.type !== 'patient'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    db.collection('users').doc(`${req.user.userName}`).update({
        doctor: firestore.FieldValue.arrayUnion(doctor)
    })
    .then(()=> {
        db.collection('users').where('parent', '==', req.user.userName).get()
        .then((data) => {
            if (!data.empty){
                data.forEach((doc)=> {
                    doc.ref.update({
                        doctor: firestore.FieldValue.arrayUnion(doctor)
                    })
                })
            }
        })
    })
    .then(()=> {
        return res.status(201).json({message: "Success"})
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })


}


exports.getAllAppointmentsForToday = (req, res) => {
    
    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    let doctor = req.user.userName;
    let dayMidnight = new Date();

    dayMidnight.setHours(0, 0, 0, 0);

    let day1159 = new Date();
    day1159.setHours(23, 59, 59, 0);
    let appointments = []
        
    db.collection('appointments').where('doctor', '==', doctor).where('start', '>', dayMidnight.toISOString()).where('start', '<', day1159.toISOString()).get()
    .then(data => {
        
        if (data.empty){
            return res.status(400).json({ error: 'No appointments for Today!'})
        } else {
            data.forEach(element => {
                appointments.push(element.data())
            })
            return res.json(appointments)
        }
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })

}


exports.getAllFamilyAppointments = (req, res) => {
   
    let appointments = [];
    db.collection('appointments').where('parent', '==', req.user.parent).get()
        .then(data => {
            if (data.empty){
                return res.status(400).json({ error: 'You have no appointments'})
            } else {
                data.forEach(element => {
                    appointments.push(element.data())
                })
                return res.json(appointments)
            }
        })
        .catch(err=> {
            console.log(err)
            return res.status(500).json({error: err.code})
        })
}


exports.getAllAppointmentsOfDoctor = (req, res) => {

    let appointments = []

    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }
    
    db.collection('appointments').where('doctor', '==', req.user.userName).get()
        .then(data => {
            if (data.empty){
                return res.status(400).json({ error: 'You have no appointments'}) 
            } else {
                data.forEach(element => {
                    appointments.push(element.data())
                })
                return res.json(appointments)
            }
        })
        .catch(err=> {
            console.log(err)
            return res.status(500).json({error: err.code})
        })
}

exports.patientBookAppointmentForHimSelf = (req, res) => {
    
        
    if (req.user.type !== 'patient'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    let ID = null;
    let appointment = {
        doctor: {
            userName: req.body.doctor.userName, 
            fullName: req.body.doctor.fullName
        },
        start: req.body.start, 
        end: req.body.end, 
        email: req.body.email,
        participants: req.body.participants,
        bookedBy: req.user.userName,
        parent: req.user.parent, 
        id: null
    }

    db.collection('appointments').add(appointment)
    .then((data) => {
        db.doc(`/appointments/${data.id}`).update({
            id: data.id
        })
        ID = data.id 
    })
    .then(()=> {
        return res.status(201).json({
            message: "Appointment booked successfully",
            bookedBy: appointment.bookedBy, 
            id: ID,
            parent: appointment.parent
        })
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({error: err.code})
    })
}


exports.doctorBookAppointmentForPatient = (req, res) => {
    
    if (req.user.type !== 'doctor'){
        return res.status(403).json({error: 'Unauthorized'})
    }

    let appointment = {
        doctor: {
            userName: req.user.userName, 
            fullName: req.user.fullName
        },
        end: req.body.end, 
        start: req.body.start, 
        participants: req.body.participants,
        bookedBy: req.user.userName,
        email: req.body.email,
        id: null
    }

    let ID = null;
    db.doc(`/users/${req.body.participants[0].userName}`).get()
    .then((doc)=> {
        appointment.parent = doc.data().parent;
    })  
    .then(()=> {
        return db.collection('appointments').add(appointment)
    }).then((data) => {
        db.doc(`/appointments/${data.id}`).update({
            id: data.id
        })
        ID = data.id 
    })
    .then(()=> {
        return res.status(201).json({
            message: "Appointment booked successfully",
            bookedBy: appointment.bookedBy, 
            id: ID,
            parent: appointment.parent, 
            doctor: appointment.doctor
        })
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({error: err.code})
    })

}

exports.cancelAppointment = (req, res) => {

    db.collection("appointments").doc(req.params.id).delete()
    .then(()=> {
        return res.status(201).json({message: "Appointment is canceled"})
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({error: err.code})
    })

}




