const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
console.log('process.env.aws_access_key_id=', process.env.aws_access_key_id);
AWS.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
});
AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
});
const EmployeeDocumentType = require('../enums/EmployeeDocumentType');

class DocumentService {
    #s3;
    #bucketName;
    static #instance = null;

    constructor() {
        if (!DocumentService.#instance) {
            this.#s3 = new AWS.S3({
                signatureVersion: 'v4',
            });
            this.#bucketName = 'employee-management-employee-info';
            DocumentService.#instance = this;
        }
        return DocumentService.#instance;
    }

    /**
     * Upload the file to S3 under the employeeId folder
     * @date 3/3/2023 - 8:31:34 AM
     *
     * @async
     * @param {{ employeeId: string; fileName: string; documentType: string; }} { employeeId, fileName, documentType }
     * @returns {unknown}
     */
    async uploadEmployeeDocument({ employeeId, fileName, documentType }) {
        const filePath = path.join(__dirname, '..', 'temp', fileName);
        const fileContent = fs.readFileSync(filePath);
        const standardizedFileName = this.standardizeFileName(documentType);
        const key = `documents/${employeeId}/${standardizedFileName}`;

        const uploadParams = {
            Bucket: this.#bucketName,
            Key: key,
            Body: fileContent,
        };

        try {
            const data = await this.#s3.putObject(uploadParams).promise();
            console.log(`File uploaded successfully to S3: ${JSON.stringify(data)}`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllDocumentsForEmployee({ employeeId }) {
        const prefix = `documents/${employeeId}`;
        const params = {
            Bucket: this.#bucketName,
            Prefix: prefix,
        }

        try {
            const s3Objects = await this.#s3.listObjectsV2(params).promise();
            const pdfFiles = s3Objects.Contents.filter((obj) => obj.Key.endsWith('.pdf'));
            const presignedUrls = await Promise.all(pdfFiles.map(async (file) => {
                const url = await this.#s3.getSignedUrlPromise('getObject', {
                    Bucket: this.#bucketName,
                    Key: file.Key,
                    Expires: 3600,
                });
                return { fileName: path.basename(file.Key), downloadLink: url };
            }));
            console.log(presignedUrls);
            return presignedUrls;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * Description placeholder
     * @date 3/3/2023 - 9:16:49 AM
     * @author Paul
     *
     * @param {string} documentType
     * @returns {("cpt.pdf" | "opt.pdf")}
     */
    standardizeFileName(documentType) {
        switch (documentType) {
            case EmployeeDocumentType.CPT:
                return 'cpt.pdf';
            case EmployeeDocumentType.OPT:
                return 'opt.pdf';
            default:
                throw Error('Unsupported document type.');
        }
    }
}

module.exports = DocumentService;