
// middleware to authenticated before sending requests

const { admin, db } = require('../util/admin');

module.exports = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    }else {
        console.error('No token found')
        return res.status(403).json({error: 'Unauthorized'})
    }

    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
        req.user = decodedToken;
        return db.collection('users').where('userId', '==', req.user.uid).limit(1).get()
    })
    .then((data) => {
     
        req.user.type = data.docs[0].data().type;
        req.user.userName = data.docs[0].data().userName;
        req.user.fullName = data.docs[0].data().fullName;
        req.user.parent = data.docs[0].data().parent;
        req.user.birthDate = data.docs[0].data().birthDate;
        req.user.doctor = data.docs[0].data().doctor;
        req.user.userId = data.docs[0].data().userId;
        return next();
    })
    .catch((err)=> {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err)
    })
}