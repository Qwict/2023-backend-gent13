const {
  getLogger,
} = require('../core/logging');
const database = require('../repository/product');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getById = async (id, languageId) => {
  debugLog(`Fetching product with id ${id}`);
  const product = await database.findById(id, languageId);
  if (product.length === 0) {
    throw ServiceError.notFound(`Product with id ${id} does not exist`, {
      id,
    });
  }
  return product;
};

const getAll = async (languageId) => {
  debugLog(`Fetching all products with language ${languageId}`);
  const products = await database.findAll(languageId);
  if (products.length === 0) {
    throw ServiceError.notFound('No products found');
  }
  const count = await database.findCount();
  return {
    products,
    count,
  };
};

const getAllByCategory = async (id, languageId) => {
  debugLog(`Fetching products with categoryId ${id}`);
  const products = await database.findProductsByCategoryId(id, languageId);

  if (products.length === 0) {
    throw ServiceError.notFound(`No products found for category with id ${id}`);
  }

  return products;
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