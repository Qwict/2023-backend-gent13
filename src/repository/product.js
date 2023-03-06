const { tables, getKnex } = require('../data');

async function findById(id) {
  const product = await getKnex()(tables.product)
    .join(tables.productPrice, `${tables.productPrice}`.userId, '=', `${tables.product}`.id)
    .join(tables.productDescription, `${tables.productDescription}`.productId, '=', `${tables.product}`.id)
    .where(`${tables.product}.id`, id)
    .first();
  return product;
}

const findAll = async () => {
  const products = await getKnex()(tables.product).select().orderBy('id', 'DESC');
  return products;
};

module.exports = {
  findById,
  findAll,
};
