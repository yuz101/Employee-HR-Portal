const DocumentService = require('../services/DocumentService');
const fs = require('fs');

const documentService = new DocumentService();

exports.uploadSingleDocument = async (req, res) => {
    let { documentType, employeeId } = req.body;
    if (!employeeId) {
        employeeId = '123';
    }

    try {
        await documentService.uploadEmployeeDocument({
            employeeId: employeeId,
            filePath: req.file.path,
            documentType: documentType,
        });
        return res.status(200);
    } catch (error) {
        console.error(error);
        return res.status(404);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
}

exports.getEmployeeWorkAuthorizationStatus = async (req, res) => {
    const { employeeId } = req.body;
    try {
        
    } catch (error) {
        console.error(error);
        return res.status(404);
    }
}