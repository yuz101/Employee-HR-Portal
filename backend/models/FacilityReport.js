const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const FacilityReportSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        createdBy: {type: refType, ref: "Employee", required: true},
        status: {type: String, required: true},
        comments: [{ type: refType, ref: "Comment" }]
    }, {
        timestamps: true,
    }
)

const FacilityReport = mongoose.model("FacilityReport", FacilityReportSchema)
module.exports = FacilityReport;