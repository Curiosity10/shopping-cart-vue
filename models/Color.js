const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColorSchema = new Schema({
  color: String
})

module.exports = mongoose.model('Color', ColorSchema)
