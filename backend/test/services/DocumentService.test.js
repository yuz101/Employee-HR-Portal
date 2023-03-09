const DocumentService = require('../../services/DocumentService');
const EmployeeDocumentTypeEnum = require('../../enums/EmployeeDocumentType');

describe('DocumentService', () => {
    let documentService;

    beforeEach(() => {
        documentService = new DocumentService();
    });

    // describe('uploadEmployeeDocument', () => {
    //     test('should upload a PDF to S3', async () => {
    //         const result = await documentService.uploadEmployeeDocument({
    //             employeeId: '123',
    //             fileName: 'test.pdf',
    //             documentType: EmployeeDocumentTypeEnum.CPT,
    //         });
    //         expect(result).toBeDefined();
    //     });
    // });

    // describe('getAllDocumentsForEmployee', () => {
    //     test('Should retrieve all download links and file names for an employee\'s documents', async () => {
    //         const presignedUrls = await documentService.getAllDocumentsForEmployee({
    //             employeeId: '123',
    //         });

    //         expect(presignedUrls).toBeDefined();
    //     })
    // });
});
