const { getLogger } = require('../core/logging');
const database = require('../repository/product');
const ServiceError = require('../core/serviceError');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getById = async (id) => {
  debugLog(`Fetching product with id ${id}`);
  const product = await database.findById(id);
  const productPrice = await database.findPriceById(id);
  const productDescription = await database.findDescriptionById(id);
  const newProduct = {
    id,
    price: productPrice.price,
    productCategoryId: product.productCategoryId,
    quantity: product.quantity,
    productAvailability: product.productAvailability,
    listerDescription: productDescription.productListerDescription,
    shortDescription: productDescription.productShortDescription,
    longDescription: productDescription.productlongDescription,
  };
  if (!product) {
    throw ServiceError.notFound(`Product with id ${id} does not exist`, {
      id,
    });
  }
  if (!productPrice) {
    throw ServiceError.notFound(`Product with id ${id} does not have price`, {
      id,
    });
  }
  if (!productDescription) {
    throw ServiceError.notFound(`Product with id ${id} does not have description`, {
      id,
    });
  }
  return newProduct;
};

const getAll = async () => {
  const products = await database.findAll();
  if (products.length === 0) {
    throw ServiceError.notFound('No products Bingggg chillinngggg');
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
