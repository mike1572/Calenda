let { isEmail, isEmpty } = require("./usefuls");

exports.validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.email)){
        errors.email = 'Must not be empty'
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address'
    }

    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty'
    }

    if (data.password !== data.confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }

    if (isEmpty(data.userName)) {
        errors.userName = 'Must not be empty'
    }

    if (isEmpty(data.birthDate)){
        errors.birthDate = 'Must not be empty'
    }

    if (isEmpty(data.fullName)){
        errors.fullName = 'Must not be empty'
    }


    data.doctor.forEach(element => {
        if (isEmpty(element)){
            errors.doctor = 'Must not be empty'
        }    
    })

    return {
        errors, 
        valid: Object.keys(errors).length === 0 ? true : false
    }

}


exports.validateSignupDataDoctor = (data) => {

    let errors = {};

    if (isEmpty(data.email)){
        errors.email = 'Must not be empty'
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address'
    }

    if (isEmpty(data.password)) {
        errors.password = 'Must not be empty'
    }

    if (data.password !== data.confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }

    if (isEmpty(data.userName)) {
        errors.userName = 'Must not be empty'
    }

    if (isEmpty(data.fullName)){
        errors.fullName = 'Must not be empty'
    }

    if (isEmpty(data.country)){
        errors.country = 'Must not be empty'
    }
    if (isEmpty(data.region)){
        errors.region = 'Must not be empty'
    }

    return {
        errors, 
        valid: Object.keys(errors).length === 0 ? true : false
    }
}


exports.validateLoginData = (data) => {
    let errors = {}

    if (isEmpty(data.email)){
        errors.email = 'Must not be empty'
    }

    if (isEmpty(data.password)){
        errors.password = 'Must not be empty'
    }

    return {
        errors, 
        valid: Object.keys(errors).length === 0 ? true : false
    }
}