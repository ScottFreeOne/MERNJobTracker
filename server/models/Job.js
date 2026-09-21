const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    localId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: "Unknown"
    },
    status: {
        type: String,
        enum: ['Added','Looking', 'Applied', 'Interviewing', 'Offer', 'Rejected'],
        default: 'Added',
    },
    applyDate: {
        type: Date,
        default: Date.now
    }, 
    notes: {
        type: String
    }

});


module.exports = mongoose.model('Job', jobSchema);