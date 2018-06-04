/* eslint-disable no-console,handle-callback-err,no-unused-vars */
const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

router.get('/', function (req, res, next) {
  const perPage = 3
  const page = parseInt(req.query.page) || 0
  let pages = 0
  const nextUrl = ''
  const prevUrl = ''
  Product.count().exec(function (err, count) {
    Product.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, products) {
        pages = Math.floor(count / perPage)
        const prevUrl = `http://localhost:3000/products?page=${page - 1}`
        const nextUrl = `http://localhost:3000/products?page=${page + 1}`
        const response = {
          products,
          currentPage: page,
          pages,
          count,
          prevUrl: '',
          nextUrl: ''
        }
        if (page === 0) {
          Object.assign(response, { nextUrl })
        } else if (page === pages - 1) {
          Object.assign(response, { prevUrl })
        } else if (page > 0 && page < pages) {
          Object.assign(response, { nextUrl, prevUrl })
        } else {
          res.redirect('/products')
        }
        res.json(response)
      })
  })
})

router.get('/:id', function (req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return console.log(err)
    res.status(200).json(product)
  })
})

router.get('/search/:vendor', function (req, res, next) {
  const perPage = 3
  const page = parseInt(req.query.page) || 0
  let pages = 0
  const nextUrl = ''
  const prevUrl = ''
  Product.count().exec(function (err, count) {
    Product.find({ vendor: req.params.vendor})
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, products) {
        pages = Math.floor(count / perPage)
        const prevUrl = `https://shopping-cart-vue.herokuapp.com/products?page=${page - 1}`
        const nextUrl = `https://shopping-cart-vue.herokuapp.com/products?page=${page + 1}`
        const response = {
          products,
          currentPage: page,
          pages,
          count,
          prevUrl: '',
          nextUrl: ''
        }
        if (page === 0) {
          Object.assign(response, { nextUrl })
        } else if (page === pages - 1) {
          Object.assign(response, { prevUrl })
        } else if (page > 0 && page < pages) {
          Object.assign(response, { nextUrl, prevUrl })
        } else {
          res.redirect('/products')
        }
        res.json(response)
      })
  })
})

module.exports = router
