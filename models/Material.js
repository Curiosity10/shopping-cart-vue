const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MaterialSchema = new Schema({
  material: String
})

module.exports = mongoose.model('Material', MaterialSchema)
