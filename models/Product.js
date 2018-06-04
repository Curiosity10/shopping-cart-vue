const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: String,
  price: Number,
  vendor: String,
  color: String,
  material: String,
  image: String,
  description: String
})

module.exports = mongoose.model('Product', ProductSchema)
