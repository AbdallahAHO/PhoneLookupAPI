module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/phone-number', require('./routes/phone_number.route'));

};
