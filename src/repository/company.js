const {
  tables,
  getKnex,
} = require('../data');

const {
  getLogger,
} = require('../core/logging');

const formatCompanyPrivacy = ({
  id,
  name,
  country,
  city,
}) => ({
  id,
  name,
  country,
  city,
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
/**
 * Create a company.
 *
 * @param {string} name
 * @param {string} countryCode
 * @param {string} vatNumber
 * @param {string} street
 * @param {string} streetNumber
 * @param {string} zipCode
 * @param {string} city
 * @param {string} country
 *
 * @returns {Promise<object>} - the created company.
 */
async function create({
  name,
  countryCode,
  vatNumber,
  street,
  streetNumber,
  zipCode,
  city,
  country,
}) {
  try {
    const [id] = await getKnex()(tables.company)
      .insert({
        name,
        countryCode,
        vatNumber,
        street,
        streetNumber,
        zipCode,
        city,
        country,
      });
    return await findById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create company', {
      error,
    });
    throw error;
  }
}

module.exports = {
  findById,
  findAll,
  findCount,
  findByVAT,
  create,
};