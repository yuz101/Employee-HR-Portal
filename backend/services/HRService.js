const House = require("../models/House");

class HRService {
  static async add_house(houseData) {
    console.log("service: adding house");
    // console.log(req);
    try {
      const { address, landlord, facility } = houseData;
      console.log("houseData: ", houseData);
      const newHouse = new House({address, landlord, facility});

      const validationError = newHouse.validateSync();
      if (validationError) {
        throw validationError;
      }

      // Check if house with same address already exists
      const existingHouse = await House.findOne({ address });
      if (existingHouse) {
        console.log(`A house with address '${address}' already exists.`);
        return null;
      }
       
      await newHouse.save();

      return newHouse;
    } catch (err) {
      console.error(err);
      throw error;
    }
  }

  static async view_house() {
    try {
      const houses = await House.find();
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
        const house = await House.findById(houseId);

        if (!house) {
            throw new Error('House not found');
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
            throw new Error('House not found');
        }

        return house;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = HRService;
