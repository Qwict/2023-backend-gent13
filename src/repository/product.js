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


const findCount = async () => {
  const count = await getKnex()(tables.product).distinct('id').count('id as count');
  return count[0].count;
};

const findCategoriesByProductId = async (id) => {
  const categories = await getKnex()(tables.productCategory).where('productId', id);
  return categories;
};

const findProductsByCategoryId = async (id) => {
  const products = await getKnex()(tables.productCategory).where('categoryId', id);
  const productIds = products.map((product) => product.productId);
  const completeProducts = [];
  for (const productId of productIds) {
    console.log(productId);
    const product = await findById(productId);
    completeProducts.push(product);
  }
  return completeProducts;
};

const update = async (id, stock) => {
   await getKnex()(tables.product).update({
    stock,
  }).where('id', id);
};
module.exports = {
  findById,
  findAll,
  findCount,
  findCategoriesByProductId,
  findProductsByCategoryId,
  update,
};