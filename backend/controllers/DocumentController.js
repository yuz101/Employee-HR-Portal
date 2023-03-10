const DocumentService = require('../services/DocumentService');
const fs = require('fs');

const documentService = new DocumentService();

exports.uploadSingleDocument = async (req, res) => {
    let employeeId = req.query.employeeId
    const documentType = req.body.documentType;
    try {
        if (!employeeId) {
            employeeId = req.token.userId;
        }
        await documentService.uploadEmployeeDocument({
            employeeId: employeeId,
            filePath: req.file.path,
            documentType: documentType,
        });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(404);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
}

exports.getDownloadLinkForOneEmployeeDocument = async (req, res) => {
    let employeeId = req.query.employeeId
    const documentType = req.query.documentType;
    try {
        if (!employeeId) {
            employeeId = req.token.userId;
        }

        if (!documentType) {
            const downloadLinks = await documentService.getAllDocumentDownloadLinksForEmployee({
                employeeId: employeeId,
            });
            return res.status(200).json({ downloadLinks });
        }
        
        const downloadLink = await documentService.getDocumentDownloadLinkForEmployee({
            employeeId: employeeId,
            documentType: documentType,
        });
        return res.status(200).json({ downloadLink });
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: 'Document not found' });
    }
}