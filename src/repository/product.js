const { tables, getKnex } = require('../data');

const SELECT_COLUMNS = [
  `${tables.product}.id`, `${tables.product}.stock`, `${tables.product}.image`,
  `${tables.product_description}.name`, `${tables.product_description}.shortDescription`, `${tables.product_description}.longDescription`,
  `${tables.product_price}.price`, `${tables.product_price}.quantity`,
  `${tables.company}.name as companyName`, `${tables.company}.logoImg`,
  `${tables.product_category}.categoryId`,
];

async function findById(id, languageId) {
  const product = await getKnex()(tables.product)
    .select([
      `${tables.product}.id`,
      `${tables.product}.stock`,
      `${tables.product}.image`,
      `${tables.productDescription}.name`,
      `${tables.productDescription}.short_description`,
      `${tables.productDescription}.long_description`,
      `${tables.productDescription}.language_id`,
      `${tables.productPrice}.price`,
      `${tables.productPrice}.quantity`,
      `${tables.company}.id as company_id`,
      `${tables.company}.name as company_name`,
      `${tables.company}.logo_img`,
      getKnex().raw(`GROUP_CONCAT(${tables.product_category}.category_id) as category_id`),
    ])
    .join(tables.product_description, `${tables.product_description}.product_id`, '=', `${tables.product}.id`)
    .join(tables.product_price, `${tables.product_price}.product_id`, '=', `${tables.product}.id`)
    .join(tables.company, `${tables.company}.id`, '=', `${tables.product}.company_id`)
    .join(tables.product_category, `${tables.product_category}.product_id`, '=', `${tables.product}.id`)
    .where(`${tables.product}.id`, id)
    .andWhere(`${tables.product_description}.language_id`, languageId)
    .groupBy(`${tables.product}.id`)
    .first();
  const formattedProducts = {
    ...product,
    category_id: product.categoryId.split(',').map((categoryId) => Number(categoryId)),
  };
  return formattedProducts;
}
const findAll = async (languageId) => {
  const products = await getKnex()(tables.product)
    .select([
      `${tables.product}.id`,
      `${tables.product}.stock`,
      `${tables.product}.image`,
      `${tables.productDescription}.name`,
      `${tables.productDescription}.shortDescription`,
      `${tables.productDescription}.longDescription`,
      `${tables.productPrice}.price`,
      `${tables.productPrice}.quantity`,
      `${tables.company}.id as companyId`,
      `${tables.company}.name as companyName`,
      `${tables.company}.logoImg`,
      getKnex().raw(`GROUP_CONCAT(${tables.productCategory}.categoryId) as categoryId`),
    ])
    .join(tables.productDescription, `${tables.productDescription}.productId`, '=', `${tables.product}.id`)
    .join(tables.productPrice, `${tables.productPrice}.productId`, '=', `${tables.product}.id`)
    .join(tables.company, `${tables.company}.id`, '=', `${tables.product}.companyId`)
    .join(tables.productCategory, `${tables.productCategory}.productId`, '=', `${tables.product}.id`)
    .where(`${tables.productDescription}.languageId`, languageId)
    .groupBy(`${tables.product}.id`)
    .orderBy('id', 'ASC');

  const formattedProducts = products.map((product) => ({
    ...product,
    categoryId: product.categoryId.split(',').map((categoryId) => Number(categoryId)),
  }));
  return formattedProducts;
  // return products;
};

const findCount = async () => {
  const count = await getKnex()(tables.product).distinct('id').count('id as count');
  return count[0].count;
};

const findCategoriesByProductId = async (id) => {
  const categories = await getKnex()(tables.productCategory).select('categoryId').where('productId', id);
  return categories;
};

const findProductsByCategoryId = async (id, languageId) => {
  const products = await getKnex()(tables.productCategory).select(SELECT_COLUMNS)
    .join(tables.product, `${tables.product}.id`, '=', `${tables.productCategory}.productId`)
    .join(tables.productDescription, `${tables.productDescription}.productId`, '=', `${tables.product}.id`)
    .join(tables.productPrice, `${tables.productPrice}.productId`, '=', `${tables.product}.id`)
    .join(tables.company, `${tables.company}.id`, '=', `${tables.product}.companyId`)
    .where(`${tables.productCategory}.categoryId`, id)
    .andWhere(`${tables.productDescription}.languageId`, languageId);
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
  findCount,
  findCategoriesByProductId,
  findProductsByCategoryId,
  update,
};