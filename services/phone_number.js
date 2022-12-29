module.exports = {
  /**
  * getLookup
  * @param {object} options - containing the following properties:
  * @param {string} options.phoneNumber - phone number to lookup
  */
  getLookup: async (options) => {
    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    const data = {
        "country_code": "<string>",
        "country_name": "<string>",
        "country_prefix": "<string>",
        "international_format": "<string>",
        "is_valid_number": "<boolean>",
        "local_format": "<string>",
        "number": "<string>",
      };

    const status = '200';

    return {
      status: status,
      data: data
    };
  },
};
