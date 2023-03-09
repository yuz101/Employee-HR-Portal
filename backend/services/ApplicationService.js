const Application = require('../models/Application');
const { default: mongoose } = require('mongoose');
const EmployeeWorkAuthorizationStatus = require('../models/EmployeeWorkAuthorizationStatus')

class ApplicationService {
  static async createFile(inputObject) {
    try {
      const retrievedApplication = await Application.findOne({ "userID": inputObject.userID })
      if (!retrievedApplication) {
        if (inputObject.identifyType.visaTitle === 'F1') {
          const newEmployeeWorkAuth = new EmployeeWorkAuthorizationStatus(
            {
              employeeId: inputObject.userID,
              workAuthorizationType: inputObject.identifyType.visaTitle,
              started: true,
              uploadFlow: [{ status: 'Pending for Review', documentType: 'OPT receipt' },
              { status: 'Not Uploaded', documentType: 'OPT EAD' },
              { status: 'Not Uploaded', documentType: 'I-983' },
              { status: 'Not Uploaded', documentType: 'I-20' }
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
      retrievedApplication.status = "Approved";
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