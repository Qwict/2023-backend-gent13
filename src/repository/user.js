const uuid = require('uuid');

const {tables, getKnex} = require('../data');
const {getLogger} = require('../core/logging');

async function findById(id){
  console.log('OI');
  const user = await getKnex()(tables.user).where('id',id).first();
  console.log(user);
  return user;
}

async function findByMail(email) {
    const user = await getKnex()(tables.user).where('email',email).first();
    return user;
}

async function create({name,email,salt,hash}){
  try {
    const id = uuid.v4();
    await getKnex()(tables.user).insert({
      id, name,email,salt,hash
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