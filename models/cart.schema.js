const mongoose = require('mongoose')
const schema = mongoose.Schema

cartSchema = new schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userdetails'
    },
    itemId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'items'
    }
})


cart = mongoose.model('cart',cartSchema)

module.exports = cart