const Application = require('../models/Application');
const { default: mongoose } = require('mongoose');

class ApplicationService {
  static async createFile(inputObject) {
    const newInputObject = new Application(inputObject)
    await newInputObject.save()
    return 'yes'
  }

  static async getApplicationById(userID) {
    try {
      const retrievedApplication = await Application.findById(userID)
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

  static async ChangeStatus(userID, status) {
    try {
      const retrievedApplication = await Application.findById(userID)
      return retrievedApplication
    } catch (e) {
      console.error(e)
    }
  }
}
module.exports = ApplicationService;