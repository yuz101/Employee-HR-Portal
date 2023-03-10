const fs = require('fs');
const router = require('express').Router();
const saveUploadedFile = require('../middleware/multer_middleware');
const DocumentController = require('../controllers/DocumentController');
const { checkSchema, validationResult } = require('express-validator');
const EmployeeDocumentTypeEnum = require('../enums/EmployeeDocumentType');
const { verifyToken } = require('../middleware/verifyToken');

const validateDocumentUpload = () => {
    return [
        checkSchema({
            documentType: {
                in: ['body'],
                notEmpty: true,
                isIn: {
                    options: [Object.values(EmployeeDocumentTypeEnum)],
                    errorMessage: 'Invalid document type.',
                },
                errorMessage: 'Missing document type',
            },
        }),
        (req, res, next) => {
            console.log(req.body);
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ errors: validationErrors.mapped() });
            }
            next();
        }
    ];
}

router.post('/',
    verifyToken,
    saveUploadedFile,
    validateDocumentUpload(),
    DocumentController.uploadSingleDocument);

router.get('/',
    verifyToken,
    DocumentController.getDownloadLinkForOneEmployeeDocument);

module.exports = router;