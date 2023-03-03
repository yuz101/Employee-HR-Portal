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

let instance = null;

class DocumentService {
    #s3;
    #bucketName;

    constructor() {
        if (!instance) {
            this.#s3 = new AWS.S3();
            this.#bucketName = 'employee-management-employee-info';
        }
    }

    async uploadDocument({ employeeId, fileName, documentType }) {
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

    standardizeFileName(documentType) {
        switch (documentType) {
            case 'cpt':
                return 'cpt.pdf';
            case 'opt':
                return 'opt.pdf';
            default:
                throw Error('Unsupported document type.');
        }
    }
}

module.exports = DocumentService;
