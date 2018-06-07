/* eslint-disable no-console */
const express = require('express')
const router = express.Router()

const Color = require('../models/Color')

router.get('/', function (req, res, next) {
  Color.find(function (err, color) {
    if (err) return console.log(err)
    res.status(200).json(color)
  })
})

module.exports = router
