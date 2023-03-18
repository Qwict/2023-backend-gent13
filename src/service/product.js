const {
  getLogger,
} = require('../core/logging');
const database = require('../repository/product');
const categoryService = require('./category');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getById = async (id) => {
  debugLog(`Fetching product with id ${id}`);
  const product = await database.findById(id);
  if (product.length === 0) {
    throw ServiceError.notFound(`Product with id ${id} does not exist`, {
      id,
    });
  }

  const categoriesByProduct = await database.findCategoriesByProductId(id);
  const bundledProduct = {
    product,
    categories: categoriesByProduct.map((productCategory) => productCategory.categoryId),
  };
  return bundledProduct;
};

const getAll = async () => {
  const products = await database.findAll();

  if (products.length === 0) {
    throw ServiceError.notFound('No products found');
  }
  return {
    products,
    count: products.length,
  };
};

const getAllByCategory = async () => {
  const categories = await categoryService.getAllIds();

  if (categories.length === 0) {
    throw ServiceError.notFound('No categories found');
  }

  const productsByCategory = [];

  for (const categoryId of categories) {
    const products = await database.findProductsByCategoryId(categoryId);
    productsByCategory.push({
      categoryId,
      products,
    });
  }

  return productsByCategory;
};

const updateById = async (id, {
  amount,
}) => {
  const product = await getById(id);
  const stock = product.stock - Number(amount);
  if (stock < 0) {
    throw ServiceError.forbidden('There is not enough stock!');
  }
  await database.update(id, stock);
};

module.exports = {
  getById,
  getAll,
  getAllByCategory,
  updateById,
};