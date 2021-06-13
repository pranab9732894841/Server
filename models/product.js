const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    qnt:{
        type: Number,
        required: true
    },
    ImagePath :{
        type: String,
        required: true
    },
    dateTime:{
        type:Date,
        required: true,
        default:Date.now
    }
})

module.exports = mongoose.model("Products" ,  productsSchema)