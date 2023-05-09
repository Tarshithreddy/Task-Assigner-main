const mongoose = require('mongoose')

const model2Schema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    }
})

const model2 = mongoose.model('model2',model2Schema)

module.exports = model2