const { tables, getKnex } = require('../data');

async function findById(id) {
  const product = await getKnex()(tables.product).where(`${tables.product}.id`, id).first();
  return product;
}
async function findPriceById(id) {
  const product = await getKnex()(tables.product).join(tables.productPrice, `${tables.productPrice}`.productId, '=', `${tables.product}`.id).where(`${tables.product}.id`, id).first();
  return product;
}
async function findDescriptionById(id) {
  const product = await getKnex()(tables.product).join(tables.productDescription, `${tables.productDescription}`.productId, '=', `${tables.product}`.id).where(`${tables.product}.id`, id).first();
  return product;
}
async function findProductsByCategoryId(id) {
  const product = await getKnex()(tables.product)
    .select()
    .join(tables.productDescription, `${tables.productDescription}`.productId, '=', `${tables.product}`.id)
    .join(tables.productPrice, `${tables.productPrice}`.productId, '=', `${tables.product}`.id)
    .where(`${tables.product}.productCategoryId`, id);
  return product;
}

const findAll = async () => {
  const products = await getKnex()(tables.product)
    .select()
    .join(tables.productDescription, `${tables.productDescription}`.productId, '=', `${tables.product}`.id)
    .join(tables.productPrice, `${tables.productPrice}`.productId, '=', `${tables.product}`.id)
    .orderBy('id', 'DESC');
  return products;
};

module.exports = {
  findById,
  findAll,
  findDescriptionById,
  findPriceById,
  findProductsByCategoryId,
};
