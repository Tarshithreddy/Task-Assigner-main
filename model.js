const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    Date : {
        type : String,
        required : true
    },
    Time : {
        type : String,
        required : true
    },
    Task : {
        type : String,
        required : true
    }

})

const model = mongoose.model('model',modelSchema)

module.exports = model