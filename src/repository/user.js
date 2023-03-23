const uuid = require('uuid');

const {
  tables,
  getKnex,
} = require('../data');
const {
  getLogger,
} = require('../core/logging');

const formatUser = ({
  email,
  name,
  firstName,
  lastName,
  role,
  street,
  streetNumber,
  zipCode,
  city,
  country,
}) => ({
  firstName,
  lastName,
  name,
  email,
  role,
  address: {
    street,
    streetNumber,
    zipCode,
    city,
    country,
  },
});

async function findById(id) {
  const user = await getKnex()(tables.user).where('id', id).first();
  return user;
}

async function findByMail(email) {
  const user = await getKnex()(tables.user).where('email', email).first();
  return user;
}

async function getUser(id) {
  const user = await getKnex()(tables.user).where('id', id).first();
  return formatUser(user);
}

async function create({
  name,
  email,
  salt,
  hash,
}) {
  // is there a better way to catch a duplicate error?
  const existingUser = await findByMail(email);
  if (existingUser !== undefined) {
    const error = new Error('DUPLICATE_ENTRY');
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
  try {
    const id = uuid.v4();
    await getKnex()(tables.user).insert({
      id,
      name,
      email,
      salt,
      hash,
    });
    return findById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
}

/**
 * Update a user with the given `id`.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} user.name - Name of the user.
 *
 * @returns {Promise<number>} - Id of the updated user.
 */
const updateById = async (id, {
  name,
  email,
  firstName,
  lastName,
  companyId,
  role,
  street,
  streetNumber,
  zipCode,
  city,
  country,
}) => {
  try {
    await getKnex()(tables.user)
      .update({
        name,
        firstName,
        lastName,
        email,
        companyId,
        role,
        street,
        streetNumber,
        zipCode,
        city,
        country,
      })
      .where('id', id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

/**
 * Update a user with the given `id`.
 *
 * @param {string} id - Id of the user to delete.
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.user)
      .delete()
      .where('id', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

const getNumberOfEmployees = async (companyId) => {
  try {
    const [count] = await getKnex()(tables.user)
      .count()
      .where('companyId', companyId);
    return count['count(*)'];
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in getNumberOfEmployees', {
      error,
    });
    throw error;
  }
};

const getAllEmployees = async (companyId) => {
  try {
    const employees = await getKnex()(tables.user)
      .select()
      .where('companyId', companyId);
    return employees.map(formatUser);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in getAllEmployees', {
      error,
    });
    throw error;
  }
};

module.exports = {
  formatUser,
  findById,
  findByMail,
  create,
  updateById,
  deleteById,
  getNumberOfEmployees,
  getAllEmployees,
  getUser,
};