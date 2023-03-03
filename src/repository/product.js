const {
  tables,
  getKnex,
} = require('../data');

async function findById(id) {
  const product = await getKnex()(tables.product)
    .where('id', id)
    .first();
  return product;
}

const findAll = async () => {
  const products = await getKnex()(tables.product)
    .select()
    .orderBy('id', 'DESC');
  return products;
};

module.exports = {
  findById,
  findAll,
};