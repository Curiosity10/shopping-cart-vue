/* eslint-disable no-console,handle-callback-err,no-unused-vars */
const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

router.get('/', function (req, res, next) {
  const perPage = 6
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

router.get('/price', function (req, res, next) {
  const perPage = 6
  const page = parseInt(req.query.page) || 0
  let pages = 0
  const nextUrl = ''
  const prevUrl = ''
  const price = req.query.price
  Product.count().exec(function (err, count) {
    Product.find().sort({ price: req.query.price })
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, products) {
        pages = Math.floor(count / perPage)
        const prevUrl = `https://shopping-cart-vue.herokuapp.com/products/price?price=${price}&page=${page - 1}`
        const nextUrl = `https://shopping-cart-vue.herokuapp.com/products/price?price=${price}&page=${page + 1}`
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

router.get('/search', function (req, res, next) {
  const perPage = 6
  const page = parseInt(req.query.page) || 0
  let pages = 0
  const nextUrl = ''
  const prevUrl = ''
  Product.count().exec(function (err, count) {
    if ((req.query.vendor === undefined && req.query.color === undefined) || (req.query.vendor === undefined && req.query.material === undefined) || (req.query.color === undefined && req.query.material === undefined)) {
      Product.find({
        $or: [
          {
            vendor: req.query.vendor
          },
          {
            material: req.query.material
          },
          {
            color: req.query.color
          }
        ]
      })
        .limit(perPage)
        .skip(perPage * page)
        .exec(function (err, products) {
          pages = Math.floor(count / perPage)
          if (page === 0) {
            res.json({
              products,
              currentPage: page,
              pages,
              count,
              prevUrl: ``,
              nextUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page + 1}`
            })
          } else if (page === pages - 1) {
            res.json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page - 1}`,
              nextUrl: ``
            })
          } else if (page > 0 && page < pages) {
            res.json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page - 1}`,
              nextUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page + 1}`
            })
          } else {
            res.redirect('/products')
          }
        })
    } else if (req.query.vendor === undefined || req.query.color === undefined || req.query.material === undefined) {
      Product.find({
        $or: [
          {
            vendor: req.query.vendor,
            color: req.query.color
          },
          {
            vendor: req.query.vendor,
            material: req.query.material
          },
          {
            color: req.query.color,
            material: req.query.material
          }
        ]
      })
        .limit(perPage)
        .skip(perPage * page)
        .exec(function (err, products) {
          pages = Math.floor(count / perPage)
          if (page === 0) {
            res.json({
              products,
              currentPage: page,
              pages,
              count,
              prevUrl: ``,
              nextUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page + 1}`
            })
          } else if (page === pages - 1) {
            res.json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page - 1}`,
              nextUrl: ``
            })
          } else if (page > 0 && page < pages) {
            res.json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page - 1}`,
              nextUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page + 1}`
            })
          } else {
            res.redirect('/products')
          }
        })
    } else {
      Product.find({
        vendor: req.query.vendor,
        color: req.query.color,
        material: req.query.material
      })
        .limit(perPage)
        .skip(perPage * page)
        .exec(function (err, products) {
          pages = Math.floor(count / perPage)
          if (page === 0) {
            res.json({
              products,
              currentPage: page,
              pages,
              count,
              prevUrl: ``,
              nextUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page + 1}`
            })
          } else if (page === pages - 1) {
            res.json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page - 1}`,
              nextUrl: ``
            })
          } else if (page > 0 && page < pages) {
            res.json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page - 1}`,
              nextUrl: `https://shopping-cart-vue.herokuapp.com/products?page=${page + 1}`
            })
          } else {
            res.redirect('/products')
          }
        })
    }
  })
})

router.get('/:id', function (req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return console.log(err)
    res.status(200).json(product)
  })
})

module.exports = router
