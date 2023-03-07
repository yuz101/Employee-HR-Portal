const Application = require('../models/Application');
const { default: mongoose } = require('mongoose');

class ApplicationService {
  static async createFile(inputObject) {
    try{
      const newInputObject = new Application(inputObject)
      await newInputObject.save()
      return 'create success'

    }catch(e){
      console.error(e)
    }
  }

  static async getApplicationById(userID) {
    try {
      const retrievedApplication = await Application.findOne({"userID": userID})
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

  static async ChangeStatus(userID, newStatus) {
    try {
      const retrievedApplication = await Application.findById(userID)
      if (!retrievedApplication) {
        throw new Error('Application not found');
      }
      retrievedApplication.status = newStatus;
      await retrievedApplication.save();
      return retrievedApplication
    } catch (e) {
      console.error(e)
    }
  }

  
}
module.exports = ApplicationService;