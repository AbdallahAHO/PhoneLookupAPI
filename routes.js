module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/', require('./routes/index.route'));

  app.use('/v1/phone-number', require('./routes/phone_number.route'));
};
