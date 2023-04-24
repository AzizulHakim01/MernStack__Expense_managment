const mongoose = require('mongoose')

const transectionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required:[true, "Amount is required"]
    },
    type:{
        type:String,
        required:[true, "type is required"]
    },
    category:{
        type:String,
        required:[true, "Category is required"]
    },
    reference:{
        type:String
    },
    description:{
        type: String,
        required:[true, "Description is required"]
    },
    date:{
        type:Date,
        required:[true, "True is required"]
    }
},{timestamps: true})

const transectionModel = mongoose.model('transections', transectionSchema)
module.exports = transectionModel;