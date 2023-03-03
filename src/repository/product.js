const { tables, getKnex } = require('../data');

async function findById(id) {
  const product = await getKnex()(tables.product).where('id', id).first();
  return product;
}

const findAll = async () => {
  const products = await getKnex()(tables.product).select().orderBy('id', 'DESC');
  return products;
};

const findPriceById = async (id) => {
  const product = await getKnex()(tables.productPrice)
    .select(` ${tables.productPrice}.productId`, ` ${tables.productPrice}.price`, ` ${tables.productPrice}.currencyId`, ` ${tables.productPrice}.quantity`)
    .join(tables.product, ` ${tables.product}.id`, '=', `${tables.productPrice}.productId`)
    .where(tables.product.id, id)
    .first();
  return product;
};

const findDescriptionById = async (id) => {
  const product = await getKnex()(tables.productDescription)
    .select(
      ` ${tables.productDescription}.productId`,
      ` ${tables.productDescription}.productName`,
      ` ${tables.productDescription}.productListerDescription`,
      ` ${tables.productDescription}.productShortDescription`,
      ` ${tables.productDescription}.productLongDescription`,
    )
    .join(tables.product, ` ${tables.product}.id`, '=', `${tables.productDescription}.productId`)
    .where(tables.product.id, id)
    .first();

  return product;
};

module.exports = {
  findById,
  findAll,
  findPriceById,
  findDescriptionById,
};
