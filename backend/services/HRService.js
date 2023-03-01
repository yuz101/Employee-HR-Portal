const House = require('../models/House');

class HRService {
    static async add_house(houseData) {
        console.log("service: adding house");
        // console.log(req);
        try {
            const {address, landlord, facility} = houseData;
            console.log("houseData: ", houseData);
            // if (!address) {
            //     return false;
            // }
            // if (!landlord) {
            //     return false;
            // }
            // if (!facility) {
            //     return false;
            // }
            const newHouse = new House({address, landlord, facility});
            await newHouse.save();
        } catch (err) {
            console.error(err);
            throw error;
        }
    }

    static async view_house(userId) {
        try {
           
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async view_house_details(userId, profile) {
        try {

        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async delete_house(userId, profile) {
        try {

        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

module.exports = HRService;