const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const HouseSchema = new Schema(
    {
        address: {type: String, required: true},
        roomates: [{ type: refType, ref: "Employee"}],
        reports: [{ type: refType, ref: "FacilityReport"}]
    }
)

const House = mongoose.model("House", HouseSchema)
module.exports = House;