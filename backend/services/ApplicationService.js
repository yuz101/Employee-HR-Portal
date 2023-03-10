const Application = require('../models/Application');
const { default: mongoose } = require('mongoose');
const EmployeeWorkAuthorizationStatus = require('../models/EmployeeWorkAuthorizationStatus');
const { DocumentStatusEnum } = require('../enums/DocumentStatusEnum');
const EmployeeDocumentTypeEnum = require('../enums/EmployeeDocumentType');

class ApplicationService {
  static async createFile(inputObject) {
    try {
      const retrievedApplication = await Application.findOne({ "userID": inputObject.userID })
      if (!retrievedApplication) {
        if (inputObject.identifyType.visaTitle === 'F1') {
          const newEmployeeWorkAuth = new EmployeeWorkAuthorizationStatus(
            {
              employeeId: inputObject.userID,
              workAuthorizationType: 'OPT',
              started: true,
              completed: false,
              uploadFlow: [{ status: DocumentStatusEnum.PENDING_FOR_REVIEW, documentType: EmployeeDocumentTypeEnum.OPT_EAD },
              { status: DocumentStatusEnum.NOT_UPLOADED, documentType: EmployeeDocumentTypeEnum.OPT_EAD },
              { status: DocumentStatusEnum.NOT_UPLOADED, documentType: EmployeeDocumentTypeEnum.I_983 },
              { status: DocumentStatusEnum.NOT_UPLOADED, documentType: EmployeeDocumentTypeEnum.I_20 },
              ]
            })
          await newEmployeeWorkAuth.save()
        }
        const newInputObject = new Application(inputObject)
        await newInputObject.save()
        return 'create success'
      } else {
        inputObject.status = 'Pending'
        retrievedApplication.set(inputObject)
        await retrievedApplication.save()
        return 'update success'
      }

    } catch (e) {
      console.error(e)
    }
  }

  static async getApplicationById(userID) {
    try {
      const retrievedApplication = await Application.findOne({ "userID": userID })
      if (!retrievedApplication) {
        return { error: "Can not find the application" }
      }
      return retrievedApplication
    } catch (e) {
      console.error(e)
    }
  }

  static async getApplications() {
    try {
      const retrievedApplications = await Application.find()
      return retrievedApplications
    } catch (e) {
      console.error(e)
    }
  }

  static async changeStatusApprove(userID) {
    try {
      const retrievedApplication = await Application.findOne({ "userID": userID })
      if (!retrievedApplication) {
        return { error: 'Application not found' };
      }
      retrievedApplication.status = DocumentStatusEnum.APPROVED;
      await retrievedApplication.save();
      return retrievedApplication
    } catch (e) {
      console.error(e)
    }
  }

  static async changeStatusReject(userID) {
    try {
      const retrievedApplication = await Application.findOne({ "userID": userID })
      if (!retrievedApplication) {
        return { error: 'Application not found' };
      }
      retrievedApplication.status = "Rejected";

      await retrievedApplication.save();
      return retrievedApplication
    } catch (e) {
      console.error(e)
    }
  }


}
module.exports = ApplicationService;