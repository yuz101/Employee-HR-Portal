const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const CommentSchema = new Schema(
    {
        description: {type: String, required: true},
        createdBy: { type: refType, ref: "Employee"},
    }, {
        timestamps: true
    }
)

const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment;