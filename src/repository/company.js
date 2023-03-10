const {
  tables,
  getKnex,
} = require('../data');

const formatCompanyPrivacy = ({
  name,
  vatNumber,
  countryCode,
}) => ({
  name,
  companyVAT: countryCode + vatNumber,
});

/**
 * Get all companies.
 */
const findAll = async () => {
  const companies = await getKnex()(tables.company)
    .select()
    .orderBy('name', 'ASC');
  return companies.map(formatCompanyPrivacy);
};

const findById = async (id) => {
  const company = await getKnex()(tables.company)
  .where('id', id).first();
  return company;
};

/**
 * Calculate the total number of companies.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.company)
    .count();
  return count['count(*)'];
};

/**
 * Find a specific company with a countryCode and vatNumber
 */
const findByVAT = async (countryCode, vatNumber) => {
  const company = await getKnex()(tables.company)
    .select()
    .where('countryCode', countryCode)
    .andWhere('vatNumber', vatNumber)
    .first();
  return company;
};

module.exports = {
  findById,
  findAll,
  findCount,
  findByVAT,
};