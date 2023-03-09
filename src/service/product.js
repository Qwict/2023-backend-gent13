const { getLogger } = require('../core/logging');
const database = require('../repository/product');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getById = async (id) => {
  debugLog(`Fetching product with id ${id}`);
  const product = await database.findById(id);
   if (!product) {
    throw ServiceError.notFound(`Product with id ${id} does not exist`, {
      id,
    });
  }
  return product;
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

module.exports = {
  getById,
  getAll,
};