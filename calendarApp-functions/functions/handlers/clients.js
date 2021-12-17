
const { db } = require('../util/admin');


exports.getPatientGeneralInfo = (req, res) => {
    
    db.doc(`/users/${req.params.info}`).get()
    .then((doc) => {
        if (doc.exists){
            return res.json(doc.data())
        } else {
            return res.status(404).json({error: "User not found"})            
        }   
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({error: err.code})
    })
}

// get data from client and his appointments
exports.getClientData = (req, res)=> {

    let clientData = {};
    db.doc(`/users/${req.user.userName}`).get()
        .then((doc)=> {
           
            if (doc.exists){
                clientData.client = doc.data()
                if (clientData.client.type === 'doctor'){
                    return db.collection('appointments').where('doctor.userName', '==', req.user.userName).get()
                } else {
                    return db.collection('appointments').where('parent', '==', req.user.userName).get()
                }

            } else {
                return res.status(404).json({error: "User not found"})
            }
           
        }).then((data)=> {
            clientData.appointments = [];
           
            data.forEach(element => {
                clientData.appointments.push(element.data())
            });
           
            return db.collection('notifications').where('recipient', '==', req.user.userName).orderBy('createdAt', 'desc').limit(15).get()
        
        })
        .then((data) => {
            clientData.notifications = []
            data.forEach((doc)=> {
                clientData.notifications.push({
                    recipient: doc.data().recipient, 
                    sender: doc.data().sender, 
                    createdAt: doc.data().createdAt, 
                    participants: doc.data().participants,
                    end: doc.data().end, 
                    start: doc.data().start, 
                    type: doc.data().type, 
                    read: doc.data().read,
                    notificationId: doc.id
    
                })
            })
        })
        .then(() => {
            if (clientData.client.type === 'doctor'){
                db.doc(`/time/${req.user.userName}`).get()
                .then((doc)=> {
                    clientData.time = doc.data()
                    let me = {
                        fullName: req.user.fullName,
                        userName: req.user.userName
                    }
                    return db.collection('users').where('doctor', 'array-contains', me).orderBy('parent').get()
                })
                .then(data => {
                    let patients = []
                    if (!data.empty){
                        data.forEach(element=> {
                            patients.push(element.data())
                        })
                    }
                    clientData.patients = patients;
                })  
                .then(()=> {
                    return res.json(clientData)
                })

            } else {

                db.collection('users').where('parent', '==', req.user.userName).get()
                .then(data=> {
                    let clients = [] 
                    if (!data.empty){           
                        data.forEach(element=> {
                            clients.push(element.data())
                        })
                    }
                    clientData.users = clients

                   return db.collection('users').where('type', '==', 'doctor').get()
                
                })
                .then(data=> {
                    let doctors = []
                    if (!data.empty){
                        data.forEach(element=> {
                            doctors.push(element.data())
                        })
                    }

                    clientData.allDoctors = doctors

                })
                .then(()=> {
                    return res.json(clientData)
                })

                
            }
        })
        .catch(err=> {
            console.log(err);
            return res.status(500).json({error: err.code})
        })

}

// get all patients of the doctor
exports.getAllPatientsPerDoctor = (req, res) => {
    let patients = []
    db.collection('users').where('doctor', 'array-contains', req.user.userName).get()
    .then(data => {

        if (data.empty){
            return res.status(400).json({ error: 'You have no registered patients'})
        } else {
            data.forEach(element=> {
                patients.push(element.data())
            })
            return res.json(patients)
        }
    })  
    .catch(err=> {
        console.log(err)
        return res.status(500).json({error: err.code})
    })
}

exports.getAllClientsLinkedToAccount = (req, res)=> {
    let clients = [];
    return db.collection('users').where('parent', '==', req.user.userName).get()
        .then(data=> {
            if (data.empty){
                return res.status(400).json({ error: 'No clients associated with this parent'})                
            } else {
                data.forEach(element=> {
                    clients.push(element.data())
                })
                return res.json(clients)
            }
        })
        .catch(err=> {
            console.log(err)
            return res.status(500).json({error: err.code})
        })
    
}

exports.getAllDoctors = (req, res) => {
    let doctors = []
    return db.collection('users').where('type', '==', 'doctor').get()
    .then(data=> {
        if (data.empty){
            return res.status(400).json({ error: 'No health professionals have yet signed up to offer their services'})                
        } else {
            data.forEach(element=> {
                doctors.push(element.data())
            })
            return res.json(doctors)
        }
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({error: err.code})
    })
}

exports.addUsersWithoutAccounts = (req, res) => {
    let userToAdd = {
        email: req.user.email, 
        userName: req.body.userName, 
        fullName: req.body.fullName,
        type: req.user.type,
        birthDate: req.body.birthDate, 
        parent: req.user.userName,
        doctor: req.user.doctor
    }   

    let bool;
    db.doc(`/users/${userToAdd.userName}`).get()
    .then((doc)=> {
        if (doc.exists){
            bool = false
            return res.status(400).json({userName: 'This user name is already taken'})
        } else {
            return db.doc(`/users/${userToAdd.userName}`).set(userToAdd)
        }
    }).then(() => {
        if (bool !==false){
            return res.status(201).json({message: "User added successfully"})
        }
        
    })
    .catch(err=> {
        console.log(err)
        return res.status(500).json({error: err.code})
    })
}


exports.markNotificationsRead = (req, res) => {
    let batch = db.batch();
    req.body.forEach((notificationId)=> {
        const notification = db.doc(`/notifications/${notificationId}`)
        batch.update(notification, { read: true });
    })
    batch.commit()
    .then(()=> {
        return res.json({ message: 'Notifications marked read'})
    })
    .catch((err)=> {
        console.error(err)
        return res.status(500).json({err})
    })
}




