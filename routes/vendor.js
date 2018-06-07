/* eslint-disable no-console */
const express = require('express')
const router = express.Router()

const Vendor = require('../models/Vendor')

router.get('/', function (req, res, next) {
  Vendor.find(function (err, vendor) {
    if (err) return console.log(err)
    res.status(200).json(vendor)
  })
})

module.exports = router
