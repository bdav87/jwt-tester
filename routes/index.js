const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const BigCommerce = require('node-bigcommerce');
const uuidv4 = require('uuid/v4');

const bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
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
});

router.get('/load', (req, res, next) => {

  let verification = bigCommerce.verify(req.query['signed_payload']);
  console.log(verification);
  res.render('index', {title: 'Load', data: JSON.stringify(verification)});

});

router.get('/uninstall', (req,res) => {
  res.sendStatus('200');
})

router.post('/generate', (req, res) => {
  let timestamp = (new Date()).getTime() / 1000;
  let payload = {
    iss: process.env.CLIENT_ID,
    iat: timestamp,
    jti: uuidv4(),
    operation: 'customer_login',
    store_hash: 'hfdehryc',
    customer_id: req.body.customerID,
    redirect_to: req.body.redirectURL
  }

  let token = jwt.sign(payload,process.env.CLIENT_SECRET, {
    header: {
      typ: 'JWT', 
      alg: 'HS256'
    }
  });

  console.log(req.body);
  res.send(`https://briandavenport.ninja/login/token/${token}`);
})


module.exports = router;
