const { tables, getKnex } = require('../data');

async function findById(id) {
  const packaging = await getKnex()(tables.packaging)
  .where('id', id).first();
  return packaging;
}
const findAll = async () => {
  const packaging = await getKnex()(tables.packaging).select().orderBy('active', 'desc');
  return packaging;
};

module.exports = {
  findById,
  findAll,
};