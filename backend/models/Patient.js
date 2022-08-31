const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const patientSchema = new Schema({
    id: {
        type: Number,
        required: [true]
    },
    Name: {
        type: String,
        required: [true]
    },
    Age: {
        type: Number,
        required: [true]
    },
    Gender: {
        type: String,
        required: [true]
    },
    Phone: {
        type: String,
        required: [true]
    }
});

module.exports = mongoose.model('Patient', patientSchema);