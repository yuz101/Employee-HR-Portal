const Employee = require("../models/Employee");
const House = require("../models/House");
const Registration = require("../models/Registration");
const nodemailer = require("nodemailer");

class HRService {
  static async send_email(name, email, token) {
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
            html: `<p>Greetings ${name}, </p> 
            <p>Please click the button below to register your account.</p> 
            <a style="padding: 10px 20px;" href="http://localhost:4200/signup?email=${email}&token=${token}">Registration</a>`, // html body
        });
        const registration = await Registration.create({ name, email, token, status: "Sent"})

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
  static async get_profiles(searchInput) {
    try {
        let employees = []
        if(searchInput) {
          employees = await Employee.aggregate([
            {
              $match: {
                $or: [
                  { firstName: { $regex: `.*${searchInput}.*`, $options: 'i'} },
                  { lastName: { $regex: `.*${searchInput}.*` , $options: 'i'} },
                  { preferredName: { $regex: `.*${searchInput}.*`, $options: 'i'} },
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

    //   // Retrieve the data of existing employees
    //   const existingEmployees = await Employee.find({
    //     _id: { $in: roommates },
    //   });

    //   // Extract the ObjectIDs of existing employees from their data
    //   const existingEmployeeIds = existingEmployees.map(
    //     (employee) => employee._id
    //   );

    // Retrieve the IDs of all employees in the database
    const employeeIds = await Employee.find().distinct("_id");
    // Shuffle the array of employee IDs randomly using the Fisher-Yates algorithm
    for (let i = employeeIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [employeeIds[i], employeeIds[j]] = [employeeIds[j], employeeIds[i]];
    }
    
      // Assign the first n employees from the shuffled array to the new house,
      // where n is the number of roommates needed for the house
      const numRoommatesNeeded = roommates.length;
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

      // Save the new house to the database
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
}

module.exports = HRService;
