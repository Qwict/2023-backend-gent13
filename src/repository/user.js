const uuid = require('uuid');

const {
  tables,
  getKnex,
} = require('../data');
const {
  getLogger,
} = require('../core/logging');

async function findById(id) {
  const user = await getKnex()(tables.user).where('id', id).first();
  return user;
}

async function findByMail(email) {
  const user = await getKnex()(tables.user).where('email', email).first();
  return user;
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
  salt,
  hash,
  companyId,
  companyVerified,
}) => {
  try {
    await getKnex()(tables.user)
      .update({
        name,
        email,
        salt,
        hash,
        companyId,
        companyVerified,
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

module.exports = {
  findById,
  findByMail,
  create,
  updateById,
  deleteById,
};