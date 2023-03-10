const mongoose = require('mongoose');
const { DocumentStatusEnum } = require('../enums/DocumentStatusEnum');

const EmployeeWorkAuthorizationStatusSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', },
    workAuthorizationType: { type: String, required: true, },
    started: { type: Boolean, default: false, },
    completed: { type: Boolean, default: false, },
    uploadFlow: [{
        status: {
            type: String,
            enum: [
                DocumentStatusEnum.NOT_UPLOADED,
                DocumentStatusEnum.PENDING_FOR_REVIEW,
                DocumentStatusEnum.APPROVED,
                DocumentStatusEnum.REJECTED
            ],
            default: DocumentStatusEnum.NOT_UPLOADED,
            required: true,
        },
        documentType: {
            type: String,
            required: true,
        },
        feedback: { type: String, },
    }],
});

const EmployeeWorkAuthorizationStatus = mongoose.model(
    'EmployeeWorkAuthorizationStatus', EmployeeWorkAuthorizationStatusSchema);

module.exports = EmployeeWorkAuthorizationStatus;