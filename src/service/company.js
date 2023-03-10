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

const getById = async (id) => {
  debugLog(`Fetching company with id ${id}`);
  const company = companyRepository.findById(id);
  return company;
};

const findByVAT = async (companyVAT) => {
  const countryCode = companyVAT.slice(0, 2);
  const vatNumber = companyVAT.slice(2);
  debugLog(`Fetching company with countryCode ${countryCode} and vatNumber ${vatNumber}`);
  const company = await companyRepository.findByVAT(countryCode, vatNumber);
  return company;
};

module.exports = {
  getById,
  register,
  findByVAT,
  // verify,
  getAll,
};