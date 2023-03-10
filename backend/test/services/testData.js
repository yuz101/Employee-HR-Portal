const EmployeeWorkAuthorizationStatus = require('../../models/EmployeeWorkAuthorizationStatus');
const { DocumentStatusEnum } = require('../../enums/DocumentStatusEnum');
const EmployeeDocumentTypeEnum = require('../../enums/EmployeeDocumentType');


const { exec } = require('child_process');

async function dumpCollection() {
    return new Promise((resolve, reject) => {
        exec(
            'mongoexport --db test --collection employeeworkauthorizationstatuses --out employeeworkauthorizationstatuses.json',
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
}

module.exports = async function quickData() {
    try {
        const sampleDatas = [{
            employeeId: '6406a1ebe4b8843c1c90cecd',
            workAuthorizationType: 'OPT',
            started: false,
            completed: false,
            uploadFlow: [
                {
                    status: DocumentStatusEnum.NOT_UPLOADED,
                    documentType: EmployeeDocumentTypeEnum.OPT_RECEIPT,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.NOT_UPLOADED,
                    documentType: EmployeeDocumentTypeEnum.OPT_EAD,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.NOT_UPLOADED,
                    documentType: EmployeeDocumentTypeEnum.I_983,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.NOT_UPLOADED,
                    documentType: EmployeeDocumentTypeEnum.I_20,
                    feedback: '',
                },
            ],
        },

        {
            employeeId: '6406b39212a13adcde71afb6',
            workAuthorizationType: 'OPT',
            started: false,
            completed: true,
            uploadFlow: [
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_RECEIPT,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_EAD,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.I_983,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.I_20,
                    feedback: '',
                },
            ],
        },

        {
            employeeId: '6406b806d0dd20a9c3902ff6',
            workAuthorizationType: 'OPT',
            started: true,
            completed: false,
            uploadFlow: [
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_RECEIPT,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_EAD,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.I_983,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.REJECTED,
                    documentType: EmployeeDocumentTypeEnum.I_20,
                    feedback: '',
                },
            ],
        },

        {
            employeeId: '640aa0d64361ed28027729b5',
            workAuthorizationType: 'OPT',
            started: true,
            completed: false,
            uploadFlow: [
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_RECEIPT,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_EAD,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.I_983,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.REJECTED,
                    documentType: EmployeeDocumentTypeEnum.I_20,
                    feedback: 'AMD YES',
                },
            ],
        },

        {
            employeeId: '6406b7d8d0dd20a9c3902ff4',
            workAuthorizationType: 'OPT',
            started: true,
            completed: false,
            uploadFlow: [
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_RECEIPT,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.APPROVED,
                    documentType: EmployeeDocumentTypeEnum.OPT_EAD,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.PENDING_FOR_REVIEW,
                    documentType: EmployeeDocumentTypeEnum.I_983,
                    feedback: '',
                },
                {
                    status: DocumentStatusEnum.NOT_UPLOADED,
                    documentType: EmployeeDocumentTypeEnum.I_20,
                    feedback: '',
                },
            ],
        },

        ];

        for (let i = 0; i < sampleDatas.length; i++) {
            const newInputObject = new EmployeeWorkAuthorizationStatus(sampleDatas[i])
            await newInputObject.save()
        }
    }
    catch (e) {
        console.log(e)
    }
}

