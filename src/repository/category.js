const { tables, getKnex } = require('../data');

async function findById(id) {
  const category = await getKnex()(tables.category)
  .where('id', id);
  return category;
}
const findAll = async () => {
  const category = await getKnex()(tables.category).select();
  return category;
};

module.exports = {
  findById,
  findAll,
};