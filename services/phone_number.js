const {PhoneNumberUtil, PhoneNumberFormat} = require('google-libphonenumber');

const phoneUtil = PhoneNumberUtil.getInstance();

function validatePhoneNumber(phoneNumber) {
  let result = {};

  try {
    const parsedNumber = phoneUtil.parse(`+${phoneNumber}`);

    const isValidNumber = phoneUtil.isValidNumber(parsedNumber);
    const getNationalNumber = parsedNumber.getNationalNumber()
    const regionCode = phoneUtil.getRegionCodeForNumber(parsedNumber) || ''

    if (!getNationalNumber) {
      throw new Error('<Error message>');
    }

    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});


    result = {
      number: getNationalNumber.toString(),
      is_valid_number: isValidNumber,
      local_format: phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL),
      international_format: phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL),
      country_name:  regionNames.of(regionCode),
      country_code: regionCode,
      country_prefix: phoneUtil.getCountryCodeForRegion(regionCode).toString(),
    };
  } catch (error) {
    console.log(error)
    throw new Error('Something Wrong happened while parsing the phone number');
  }

  return result;
}


module.exports = {
  /**
  * getLookup
  * @param {object} options - containing the following properties:
  * @param {string} options.phoneNumber - phone number to lookup
  */
  getLookup: async (options) => {
    const checkIfPhoneNumberIsValid = (phoneNumber) => {
      try {
        const parsedNumber = phoneUtil.parse(`+${phoneNumber}`);
        return phoneUtil.isValidNumber(parsedNumber);
      } catch (error) {
        return false;
      }
    };

    if (!checkIfPhoneNumberIsValid(options.phoneNumber)) {
      return {
        status: '400',
        data: {
          error: 'The phone number is invalid'
        }
      }
    }

    const data = validatePhoneNumber(options.phoneNumber);
    const status = '200';

    return {
      status: status,
      data: data
    };
  },
};
