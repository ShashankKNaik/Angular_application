const mongoose = require('mongoose')
const schema = mongoose.Schema

itemSchema = new schema({
   category: String,
   product_title: String,
   product_description:String,
   brand: String,
   price: Number,
   stock_availibility: String,
   image_urls: String
})

item = mongoose.model('items',itemSchema)

module.exports = item