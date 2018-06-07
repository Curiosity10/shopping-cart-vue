/* eslint-disable no-console */
const express = require('express')
const router = express.Router()

const Material = require('../models/Material')

router.get('/', function (req, res, next) {
  Material.find(function (err, material) {
    if (err) return console.log(err)
    res.status(200).json(material)
  })
})

module.exports = router
