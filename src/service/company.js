const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');

const companyRepository = require('../repository/company');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const register = async ({
  name,
  countryCode,
  vatNumber,
  street,
  streetNumber,
  zipCode,
  city,
  country,
}) => {
  debugLog(`Creating company with name ${name} and vat ${vatNumber}`);
};

/**
 * Get all companies.
 */
const getAll = async () => {
  debugLog('Fetching all companies');
  const data = await companyRepository.findAll();
  const totalCount = await companyRepository.findCount();
  return {
    data,
    count: totalCount,
  };
};

module.exports = {
  register,
  // verify,
  getAll,
};