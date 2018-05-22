const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.get('/', function (req, res, next) {
  let perPage = 6;
  let page = parseInt(req.query.page) || 0;
  let pages = 0;
  let nextUrl = '';
  let prevUrl = '';
  Product.count().exec(function (err, count) {
    Product.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, products) {
        pages = Math.floor(count / perPage);
        let prevUrl = `http://localhost:3000/products?page=${page - 1}`;
        let nextUrl = `http://localhost:3000/products?page=${page + 1}`;
        let response = {
          products,
          currentPage: page,
          pages,
          count,
          prevUrl: '',
          nextUrl: ''
        };
        if (page === 0) {
          Object.assign(response, {nextUrl});
        } else if (page === pages - 1) {
          Object.assign(response, {prevUrl});
        } else if (page > 0 && page < pages) {
          Object.assign(response, {nextUrl, prevUrl});
        } else {
          res.redirect('/products')
        }
        res.json(response);
      });
  });
});

router.get('/:id', function (req, res, next) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return console.log(err);
    res.status(200).json(product);
  })
});

module.exports = router;