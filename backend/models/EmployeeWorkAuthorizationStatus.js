const mongoose = require('mongoose');

const EmployeeWorkAuthorizationStatusSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', },
    uploadFlow: [{
        status: {
            type: String,
            enum: ['Not Uploaded', 'Pending for Review', 'Approved', 'Rejected'],
            default: 'Not Uploaded',
            required: true,
        },
        documentType: {
            type: String,
            required: true,
        },
        feedback: { type: String, },
    }],
    started: { type: Boolean, default: false, },
    completed: { type: Boolean, default: false, },
});

const EmployeeWorkAuthorizationStatus = mongoose.model(
    'EmployeeWorkAuthorizationStatus', EmployeeWorkAuthorizationStatusSchema);

module.exports = EmployeeWorkAuthorizationStatus;