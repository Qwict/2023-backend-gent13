const uuid = require('uuid');

const {
  tables,
  getKnex
} = require('../data');
const {
  getLogger
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
  hash
}) {
  // is there a better way to catch a duplicate error?
  const existingUser = await findByMail(email);
  if (existingUser != undefined) {
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
      hash
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

module.exports = {
  findById,
  findByMail,
  create
}