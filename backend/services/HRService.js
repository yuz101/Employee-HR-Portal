const Employee = require("../models/Employee");
const House = require("../models/House");
const RegistrationEmail = require("../models/RegistrationEmail");
const nodemailer = require("nodemailer");
const EmployeeWorkAuthorizationStatus = require("../models/EmployeeWorkAuthorizationStatus");
const { DocumentStatusEnum } = require("../enums/DocumentStatusEnum");

class HRService {
  static async sendRegistrationEmail({ firstName, middleName, lastName, email }, token) {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'teamnull2023@gmail.com',
          pass: 'walmiaczzpxlcdvn',
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'Beaconfire Solution <teamnull2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "[Important] Registration Link for Beaconfire", // Subject line
        text: "Welcome to Beaconfire Solution", // plain text body
        html: `<p>Greetings ${firstName} ${lastName}, </p> 
            <p>Please click the button below to register your account.</p> 
            <a style="padding: 10px 20px;" href="http://localhost:4200/auth/signup?email=${email}&token=${token}">Registration</a>`, // html body
      });
      const date = new Date()
      const expiration = date.setHours(date.getHours() + 3);
      const registration = await RegistrationEmail.create({ firstName, middleName, lastName, email, token, expiration: expiration, status: "sent" })

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      return registration
    } catch (err) {
      console.error(err);
      throw error;
    }
  }

  static async resendRegistrationEmail(registrationEmailId) {

    try {
      console.log(registrationEmailId)
      let registrationEmail = await RegistrationEmail.findById(registrationEmailId)
      console.log(registrationEmail)
      const { firstName, middleName, lastName, preferredName, email, token } = registrationEmail
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'teamnull2023@gmail.com',
          pass: 'walmiaczzpxlcdvn',
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'Beaconfire Solution <teamnull2023@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "[Important] Registration Link for Beaconfire", // Subject line
        text: "Welcome to Beaconfire Solution", // plain text body
        html: `<p>Greetings ${firstName}(${preferredName}) ${lastName}, </p> 
            <p>Please click the button below to register your account.</p> 
            <a style="padding: 10px 20px;" href="http://localhost:4200/auth/signup?email=${email}&token=${token}">Registration</a>`, // html body
      });

      const date = new Date()
      const expiration = date.setHours(date.getHours() + 3);
      const updatedRegistrationEmail = await RegistrationEmail.findByIdAndUpdate(
        registrationEmailId,
        {
          $set: { expiration: expiration, status: "sent" }
        },
        { new: true }
      )

      console.log("From HR Service: ", updatedRegistrationEmail)

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      return updatedRegistrationEmail
    } catch (err) {
      console.error(err);
      throw error;
    }

  }

  static async getRegistrationEmails() {
    try {
      const registrationEmails = await RegistrationEmail.find()
      return registrationEmails
    } catch (err) {
      console.error(err);
      throw error;
    }
  }

  static async findRegistrationEmail(emailToken) {
    try {
      const registrationEmail = await RegistrationEmail.findOne({ token: emailToken })
      return registrationEmail
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async updateRegistrationEmail(registrationId, registration) {
    try {
      const updateRegistrationEmail = await RegistrationEmail.findByIdAndUpdate(
        registrationId,
        {
          $set: registration,
        },
        { new: true }
      )
      return updateRegistrationEmail
    } catch (err) {
      console.error(err);
      throw error;
    }
  }

  static async getProfiles(searchInput) {
    try {
      let employees = []
      if (searchInput) {
        employees = await Employee.aggregate([
          {
            $match: {
              $or: [
                { firstName: { $regex: `.*${searchInput}.*`, $options: 'i' } },
                { lastName: { $regex: `.*${searchInput}.*`, $options: 'i' } },
                { preferredName: { $regex: `.*${searchInput}.*`, $options: 'i' } },
              ],
            },
          },
        ])
      } else {
        employees = await Employee.find()
      }
      return employees
    } catch (err) {
      console.error(err);
      throw error;
    }
  }

  static async add_house(houseData) {
    console.log("service: adding house");
    try {
      const { address, landlord, facility, residents, roommates, reports } =
        houseData;

    // Retrieve the IDs of all employees in the database
    const employeeIds = await Employee.find().distinct("_id");
    // Shuffle the array of employee IDs randomly using the Fisher-Yates algorithm
    for (let i = employeeIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [employeeIds[i], employeeIds[j]] = [employeeIds[j], employeeIds[i]];
      }

      // Assign the first n employees from the shuffled array to the new house,
      // where n is the number of roommates needed for the house
      const numRoommatesNeeded = houseData.roommates.roommates;
      // console.log("roommates: ", houseData.roommates.roommates);
      const assignedEmployees = employeeIds.slice(0, numRoommatesNeeded);

      // Create a new House object with the assigned roommates' IDs
      const newHouse = new House({
        address,
        landlord,  
        facility,
        residents,
        roommates: assignedEmployees,
        reports,
      });

      // Check if house with same address already exists
      const existingHouse = await House.findOne({
        "address.city": houseData.address.city,
        "address.state": houseData.address.state,
        "address.zip": houseData.address.zip,
      });
      if (existingHouse) {
        console.log(`A house with address '${address}' already exists.`);
        return null;
      }

      // // Save the new house to the database
      await newHouse.save();

      // Populate the `roommates` field with the full data of the assigned employees
      //   await newHouse.populate("roommates").exec();

      // Extract the IDs of the assigned employees from the populated data
      const assignedEmployeeIds = newHouse.roommates.map(
        (roommate) => roommate._id
      );

      // Update the `roommates` field of the new house with the correct employee IDs
      newHouse.roommates = assignedEmployeeIds;

      // Save the updated house to the database
      await newHouse.save();

      return newHouse;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  

  static async view_house() {
    console.log("service: view houses");
    try {
      const houses = await House.find().select("address landlord residents");
      if (!houses) {
        const error = new Error("House not found");
        error.status = 404;
        throw error;
      }

      return houses;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async view_house_details(houseId) {
    try {
      const house = await House.findById(houseId).populate("roommates");
      if (!house || house.roommates.length === 0) {
        console.log("No roommates found for house with ID:", houseId);
      } else {
        console.log("Roommates:", house.roommates);
      }
      // const house = await House.findById(houseId);
      if (!house) {
        throw new Error("House not found");
      }

      return house;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async delete_house(houseId) {
    try {
      const house = await House.findByIdAndDelete(houseId);

      if (!house) {
        throw new Error("House not found");
      }

      return house;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getWorkAuthorizationRecord(employeeId) {
    try {
      const record = await EmployeeWorkAuthorizationStatus.findOne({ employeeId }).exec();
      if (!record) {
        throw new Error("Employee Work Authorization Status not found");
      }
      return record;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async getAllCurrentWorkAuthorizationStatusRecords() {
    try {
      // filter employees with upflow status "Not Uploaded"
      const currentStatusRecords = await EmployeeWorkAuthorizationStatus.aggregate([
        {
          $match: {
            "uploadFlow.status": {
              $in: [
                DocumentStatusEnum.NOT_UPLOADED,
                DocumentStatusEnum.PENDING_FOR_REVIEW,
                DocumentStatusEnum.REJECTED,
              ]
            }
          }
        },
        {
          $lookup: {
            from: "employees",
            localField: "employeeId",
            foreignField: "_id",
            as: "employee"
          }
        },
        {
          $project: {
            employeeId: 1,
            workAuthorizationType: 1,
            started: 1,
            completed: 1,
            uploadFlow: {
              $filter: {
                input: "$uploadFlow",
                as: "flow",
                cond: {
                  $in: [
                    "$$flow.status",
                    [
                      DocumentStatusEnum.NOT_UPLOADED,
                      DocumentStatusEnum.PENDING_FOR_REVIEW,
                      DocumentStatusEnum.REJECTED
                    ]
                  ]
                }
              }
            },
            firstName: { $arrayElemAt: ["$employee.firstName", 0] },
            lastName: { $arrayElemAt: ["$employee.lastName", 0] },
            middleName: { $arrayElemAt: ["$employee.middleName", 0] },
            preferredName: { $arrayElemAt: ["$employee.preferredName", 0] },
          }
        },
        {
          $addFields: {
            uploadFlow: { $slice: ["$uploadFlow", 1] }
          }
        }
      ]).exec();

      const formattedRecords = currentStatusRecords.map((record) => {
        const action = {
          name: '',
        };
        if (record.uploadFlow[0].status === DocumentStatusEnum.NOT_UPLOADED
          || record.uploadFlow[0].status === DocumentStatusEnum.REJECTED) {
          action.name = 'Send Notification';
        }
        else if (record.uploadFlow[0].status === DocumentStatusEnum.PENDING_FOR_REVIEW) {
          action.name = 'Review';
        }
        return {
          employeeId: record.employeeId,
          firstName: record.firstName,
          lastName: record.lastName,
          middleName: record.middleName,
          preferredName: record.preferredName,
          workAuthorization: record.workAuthorizationType,
          workAuthorizationStatus: {
            started: record.started,
            completed: record.completed,
            documentType: record.uploadFlow[0].documentType,
            documentStatus: record.uploadFlow[0].status,
            feedback: record.uploadFlow[0].feedback,
            action: action,
          }
        };
      });

      if (!currentStatusRecords) {
        throw new Error("Employee Work Authorization Step not found");
      }

      return formattedRecords;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateDocumentStatus(employeeId, action, feedback) {
    try {
      const currentRecord = await EmployeeWorkAuthorizationStatus.findOne({ employeeId: employeeId }).exec();
      if (!currentRecord) {
        throw new Error("Employee work authorization status not found");
      }

      const flow = currentRecord.uploadFlow;
      let currentIndex = -1;
      for (let i = 0; i < flow.length; i++) {
        if (flow[i].status === DocumentStatusEnum.PENDING_FOR_REVIEW) {
          currentIndex = i;
          break;
        }
      };

      if (currentIndex === -1) {
        throw new Error('Cannot update document status, no document is pending for review');
      }

      const currentDocument = flow[currentIndex];
      if (action === 'approve') {
        currentDocument.status = DocumentStatusEnum.APPROVED;
        currentDocument.feedback = '';
      }
      else if (action === 'reject') {
        currentDocument.status = DocumentStatusEnum.REJECTED;
        currentDocument.feedback = feedback;
      }

      if (currentIndex === flow.length - 1) {
        currentRecord.completed = true;
      }

      let nextCurrentDocument;
      if (currentIndex < flow.length - 1) {
        nextCurrentDocument = flow[currentIndex + 1];
      }
      else {
        nextCurrentDocument = flow[currentIndex];
      }

      let newStatusRecord = {
        started: currentRecord.started,
        completed: currentRecord.completed,
        documentType: nextCurrentDocument.documentType,
        documentStatus: nextCurrentDocument.status,
        feedback: nextCurrentDocument.feedback,
        action: null,
      }

      if (nextCurrentDocument.status === DocumentStatusEnum.NOT_UPLOADED
        || nextCurrentDocument.status === DocumentStatusEnum.REJECTED) {
        newStatusRecord.action = {
          name: 'Send Notification',
        }
      }
      else if (nextCurrentDocument.status === DocumentStatusEnum.PENDING_FOR_REVIEW) {
        newStatusRecord.action = {
          name: 'Review',
        }
      }
      await currentRecord.save();
      return newStatusRecord;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = HRService;
