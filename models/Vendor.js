const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VendorSchema = new Schema({
  vendor: String
})

module.exports = mongoose.model('Vendor', VendorSchema)
