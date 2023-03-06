const EmployeeWorkAuthorizationStatus = require('../models/EmployeeWorkAuthorizationStatus');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const status = new EmployeeWorkAuthorizationStatus({
            employeeId: '6404f120ed0b5879af968f52',
            workAuthorizationType: 'OPT',
            started: true,
            completed: false,
            uploadFlow: [
                {
                    status: 'Not Uploaded',
                    documentType: 'OPT Receipt',
                    feedback: '',
                },
                {
                    status: 'Not Uploaded',
                    documentType: 'OPT EAD',
                    feedback: '',
                },
                {
                    status: 'Not Uploaded',
                    documentType: 'I-983',
                    feedback: '',
                },
            ]
        });
        await status.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
    res.status(200).json({ message: 'Hello World!' });
});


module.exports = router;