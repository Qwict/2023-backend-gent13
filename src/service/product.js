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
  const productPrice = await database.findPriceById(id);
  const productDescription = await database.findDescriptionById(id);
  const newProduct = {
    id,
    productCategory: product.productCategoryId,
    stock: product.stock,
    currencyId: productPrice.currencyId,
    price: productPrice.price,
    quantity: productPrice.quantity,
    languageId: productDescription.languageId,
    productName: productDescription.productName,
    productShortDescription: productDescription.productShortDescription,
    productLongDescription: productDescription.productLongDescription,
  };
  if (!product) {
    throw ServiceError.notFound(`Product with id ${id} does not exist`, {
      id,
    });
  }
  return newProduct;
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
