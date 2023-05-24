const jwt = require('jsonwebtoken');
const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');

const notificationFactory = require('../repository/notificationFactory');
const companyRepository = require('../repository/company');
const userRepository = require('../repository/user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const decodeToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });
    return decoded;
  } catch (error) {
    throw ServiceError.validationFailed('Token verification failed');
  }
};

// local vat check
const findByVAT = async (companyVAT) => {
  const countryCode = companyVAT.slice(0, 2);
  const vatNumber = companyVAT;
  debugLog(`Fetching company with countryCode ${countryCode} and vatNumber ${vatNumber}`);
  const company = await companyRepository.findByVAT(countryCode, vatNumber);
  if (!company) {
    throw ServiceError.notFound(`No company was found with VAT ${companyVAT}`);
  }
  return company;
};

// remote vat check
const getCompanyByVAT = async (companyVAT) => {
  const response = await fetch(`https://controleerbtwnummer.eu/api/validate/${companyVAT}.json`);
  const company = await response.json();
  if (company.name) {
    return company;
  }
  throw ServiceError.notFound(`Company with ${companyVAT} not found`, {
    companyVAT,
  });
};

const register = async (company, newAdminToken) => {
  debugLog(`Creating company with name ${company.name} and vatNumber ${company.vatNumber}`);
  const checkIfExists = await companyRepository.findByVAT(company.countryCode, company.vatNumber);
  if (checkIfExists) {
    const companyVAT = company.countryCode + company.vatNumber;
    throw ServiceError.duplicate(`Company with ${companyVAT} already exists`, {
      companyVAT,
    });
  }
  debugLog(`Logo image will be '' because it is not yet implemented`);
  const createdCompany = await companyRepository.create({
    ...company,
    // TODO CHANGE THIS WHEN LOGO IMAGE IS SUPPORTED
    logoImg: '',
  });
  const createdCompanyId = createdCompany.id;
  debugLog(`Company with id ${createdCompanyId} CREATED!`);
  const decodedNewAdmin = await decodeToken(newAdminToken);
  // should not call userRepository from companyService -> do it anyway to prevent circular dependency!
  const user = await userRepository.findByMail(decodedNewAdmin.email);
  const admin = {
    ...user,
    companyId: createdCompanyId,
    role: 'admin',
  };
  // removed await
  userRepository.updateById(admin.id, {
    ...admin,
  });
  // removed await
  notificationFactory.create({
    companyId: createdCompanyId,
    date: new Date().toString(),
    audience: 'admin',
    subject: `New Company registered`,
    text: `Company ${createdCompany.name} (${createdCompany.vatNumber}) was registered by ${admin.name ? `${admin.name} (${admin.email})` : admin.email} }`,
  });
  debugLog(`Company with id ${createdCompanyId} now has ${admin.email} as admin !`);
};

/**
 * Get all companies.
 */
const getAll = async () => {
  debugLog('Fetching all companies');
  const data = await companyRepository.findAll();
  const totalCount = await companyRepository.findCount();
  if (!data) {
    throw ServiceError.notFound('No companies were found');
  }
  return {
    data,
    count: totalCount,
  };
};

const getById = async (id) => {
  debugLog(`Fetching company with id ${id}`);
  const company = companyRepository.findById(id);
  if (!company) {
    throw ServiceError.notFound(`There is no company with id ${id}`);
  }
  return company;
};

module.exports = {
  getById,
  register,
  findByVAT,
  getCompanyByVAT,
  // verify,
  getAll,
};