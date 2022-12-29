const express = require('express');
const rateLimit = require('express-rate-limit');
const basicAuth = require('express-basic-auth');

const phone_number = require('../services/phone_number');

const router = new express.Router();

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    "error": "Too many requests, please try again later"
  },
});

// get username from Env variables
const username = process.env.USERNAME || 'username';
const password = process.env.USERNAME || 'password';

// Set up basic authentication
const auth = basicAuth({
  users: { [username]: password },
  challenge: true,
  realm: 'Phone Lookup API',
});

router.get('/lookup', limiter, auth, async ( req, res, next) => {
  let options = {
    "phoneNumber": req.query.phoneNumber,
  };


  try {
    const result = await phone_number.getLookup(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;