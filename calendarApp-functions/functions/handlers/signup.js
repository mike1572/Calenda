
const { db } = require('../util/admin');

const config = require('../util/config')

const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth')

const {initializeApp} = require('firebase/app')
initializeApp(config);

const { validateSignupDataDoctor, validateSignupData, validateLoginData} = require('../util/validators');

exports.signupPatient = (req, res) => {

    const newPatient = {
        email: req.body.email, 
        password: req.body.password, 
        confirmPassword: req.body.confirmPassword, 
        userName: req.body.userName, 
        birthDate: req.body.birthDate,
        fullName: req.body.fullName,
        doctor: req.body.doctor,
        type: req.body.type
    }

    const { valid, errors } = validateSignupData(newPatient);
        
    if (!valid){
        return res.status(400).json(errors);
    }

    let auth = getAuth()
    let userId, token;
    db.doc(`/users/${newPatient.userName}`).get()
    .then((doc)=> {
        if (doc.exists){
            return res.status(400).json({userName: 'This user name is already taken'})
        } else {
            return createUserWithEmailAndPassword(auth, newPatient.email, newPatient.password)

        }

    }).then((data)=> {

        if (data.user === undefined){
            return false
        }
        userId = data.user.uid;
        return data.user.getIdToken()
    }).then((idToken)=> {
        token = idToken;
     
        const credentials = {
            email: newPatient.email, 
            userName: newPatient.userName, 
            birthDate: newPatient.birthDate,
            fullName: newPatient.fullName,
            doctor: newPatient.doctor,
            parent: newPatient.userName,
            userId: userId, 
            type: newPatient.type
        }
        
        if (idToken !== false){
            return db.doc(`/users/${newPatient.userName}`).set(credentials)     
        }
       

    }).then(()=> {
        if (token !== false){
            return res.status(201).json({token})
        }
       
    }).catch((err)=> {
        console.error(err)
        if (err.code === "auth/email-already-exists"){
            return res.status(400).json({ email: 'Email is already used'})
        } else if ( err.code === "auth/invalid-password"){
            return res.status(400).json({ password: 'Password needs a minimum of 6 characters'})
        }else {
            return res.status(500).json({ general: "Something went wrong, please try again"})
        }
        
    })

}


exports.signupDoctor = (req, res) => {
    
    const newDoctor = {
        email: req.body.email, 
        password: req.body.password, 
        confirmPassword: req.body.confirmPassword, 
        userName: req.body.userName, 
        fullName: req.body.fullName,
        type: req.body.type, 
        country: req.body.country, 
        region: req.body.region, 
    }

    const { valid, errors } = validateSignupDataDoctor(newDoctor);

    if (!valid){
        return res.status(400).json(errors);
    }
    let auth = getAuth()
    let userId, token;
    db.doc(`/users/${newDoctor.userName}`).get()
    .then((doc)=> {
        if (doc.exists){
            return res.status(400).json({userName: 'This user name is already taken'})
        } else {
            return createUserWithEmailAndPassword(auth, newDoctor.email, newDoctor.password)

        }

    }).then((data)=> {
        if (data.user === undefined){
            return false
        }
        userId = data.user.uid;
        return data.user.getIdToken()
    }).then((idToken)=> {
        
        token = idToken;
     
        const credentials = {
            email: newDoctor.email, 
            userName: newDoctor.userName, 
            fullName: newDoctor.fullName,
            userId: userId,
            type: newDoctor.type, 
            country: newDoctor.country, 
            region: newDoctor.region
        }

        if (idToken !== false){
            return db.doc(`/users/${newDoctor.userName}`).set(credentials)
        }

    }).then(()=> {
        if (token !== false){
            return db.doc(`/time/${newDoctor.userName}`).set({
                doctor: newDoctor.userName,
                reserved: [], 
                holidays: [],
                rule: 3, 
                earliestDay: 7, 
                workingDays: {
                    Monday : [],
                    Tuesday: [],
                    Wednesday: [],
                    Thursday: [],
                    Friday: [],
                    Saturday: [],
                    Sunday: []
                }
                
            })
        }
    }).then(()=> {
        if (token !== false){
            return res.status(201).json({token})
        }
    }).catch((err)=> {
        console.error(err)
        if (err.code === "auth/email-already-exists"){
            return res.status(400).json({ email: 'Email is already used'})
        } else if ( err.code === "auth/invalid-password"){
            return res.status(400).json({ password: 'Password needs a minimum of 6 characters'})
        }else {
            return res.status(500).json({ general: "Something went wrong, please try again"})
        }
        
    })
}

exports.login = (req, res) => {

    const user = {
        email: req.body.email, 
        password: req.body.password
    }

    const { valid, errors } = validateLoginData(user);

    if (!valid){
        
        return res.status(400).json(errors)
    }

    let auth = getAuth()
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((data)=> {
        return data.user.getIdToken()
    })
    .then((token)=> {
        return res.json({token})
    })
    .catch((err)=> {
        console.error(err)
        if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found'){
            return res.status(403).json({general: 'Wrong credentials, please try again'})
        } else if (err.code === 'auth/invalid-email'){
            return res.status(403).json({email: 'Invalid email'})
        }
        else if (err.code === 'auth/too-many-requests'){
            return res.status(403).json({general: 'There has been too many login failures. Try again later'})
        }
        else {
            return res.status(500).json({error: err.code})
        }
    })
}