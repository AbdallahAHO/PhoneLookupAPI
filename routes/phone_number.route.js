const express = require('express');
const phone_number = require('../services/phone_number');

const router = new express.Router();

router.get('/lookup', async (req, res, next) => {
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