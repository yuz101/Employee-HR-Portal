const DocumentService = require('../../services/DocumentService');

describe('DocumentService', () => {
    let documentService;

    beforeEach(() => {
        documentService = new DocumentService();
    });

    describe('uploadDocument', () => {
        test('should upload a PDF to S3', async () => {
            const result = await documentService.uploadDocument({
                employeeId: '123',
                fileName: 'test.pdf',
                documentType: 'cpt',
            });
            expect(result).toBeDefined();
        });
    });
});
