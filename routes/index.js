const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const BigCommerce = require('node-bigcommerce');

const bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: 'ivi3bodo24q0jzxrglt9crpspxr0lv2',
  secret: '87a7zw533cvk4vskgfj1dyo0tpzoyt0',
  callback: 'https://jwt-tester.herokuapp.com/auth',
  responseType: 'json',
  apiVersion: 'v2' // Default is v2
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JWT Tester' });
});

router.get('/auth', (req,res, next) => {
  bigCommerce.authorize(req.query)
  .then((data) => res.render('index', { title: 'Authorized!', data: JSON.stringify(data) }))
  .catch((err) => {
    console.log(`Auth route error: ${err}`);
  });
  next();
});

router.get('/load', (req, res, next) => {
  bigCommerce.verify(req.query['signed_payload'])
    .then(data => res.render('index', { title: 'Welcome!', data: data }))
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
});

router.get('/uninstall', (req,res) => {
  res.sendStatus('200');
})

module.exports = router;
