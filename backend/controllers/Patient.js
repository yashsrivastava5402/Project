const patient = require('../models/Patient');

exports.addPatient = (req, res) => {
    const { id, Name, Age, Gender, Phone } = req.body;
    patient.findOne({id: id}, (err, patient) => {
        if(err){
            console.log(err);
        }
        else if(patient){
            res.status(500).send("Patient already present!");
        }
        else{
            const newPatient = {
                id,
                Name,
                Age,
                Gender,
                Phone
            };
            patient.insertMany(newPatient, (err, patient) => {
                if(err){
                    consol.log(err);
                }
                else{
                    res.status(200).send(patient);
                }
            })
        }
    })
}

exports.patientLogin = (req, res) => {
    const { id } = req.body; 
    patient.findOne({id: id}, (err,patient) => {
        if(err){
            console.log(err);
        }
        else if(patient){
            res.status(200).send(patient);
        }
        else{
            res.status(500).send("Invalid credentials");
        }
    })
}