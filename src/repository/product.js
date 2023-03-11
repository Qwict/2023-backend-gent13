const { tables, getKnex } = require('../data');

async function findById(id) {
  const product = await getKnex()(tables.product)
  .select()
  .join(tables.productDescription, `${tables.productDescription}.productId`, '=', `${tables.product}.id`)
  .join(tables.productPrice, `${tables.productPrice}.productId`, '=', `${tables.product}.id`)
.where(`${tables.product}.id`, id);
  return product;
}
const findAll = async () => {
  const products = await getKnex()(tables.product)
    .select()
    .join(tables.productDescription, `${tables.productDescription}.productId`, '=', `${tables.product}.id`)
    .join(tables.productPrice, `${tables.productPrice}.productId`, '=', `${tables.product}.id`)
    .orderBy('id', 'ASC');
  return products;
};

const update = async (id, stock) => {
   await getKnex()(tables.product).update({
    stock,
  }).where('id', id);
};
module.exports = {
  findById,
  findAll,
  update,
};