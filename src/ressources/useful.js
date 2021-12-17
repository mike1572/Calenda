

export const parseISOString = (s) => {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}


export const isInTheRange = (start, end, date) => {
    if (date >= start && date <= end){
        return true
    } else {
        return false
    }
}

export const doesNotOverlap = (start, end, startToConsider, endToConsider) => {
    if ( (startToConsider > end  && endToConsider > end) || (endToConsider < start && startToConsider < start)){
        return true
    } else {
        return false
    }
}

export const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

export const convertAppointment = (appointment, type) => {

    let start = parseISOString(appointment.start);
    let end = parseISOString(appointment.end);

    let duration= Math.abs(end - start);
    duration = Math.ceil(duration/ (1000 * 60 )); 

    let title = `Appointment with `

    if (type === 'doctor') {
        for (let i = 0; i < appointment.participants.length; i++){
            if (i === appointment.participants.length -1){
                title += appointment.participants[i].fullName
            } else {
                title += appointment.participants[i].fullName + ', '
            }
        }
    } else {
        title += appointment.doctor.fullName
    }

    return {
        title: title, 
        start: start, 
        duration: duration,
        end: end,
        id: appointment.id
    }

}