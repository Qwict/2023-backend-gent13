const {
  tables,
  getKnex,
} = require('../data');
const {
  getLogger,
} = require('../core/logging');

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

/**
 * Calculate the total number of companies.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.company)
    .count();
  return count['count(*)'];
};

module.exports = {
  findAll,
  findCount,
};