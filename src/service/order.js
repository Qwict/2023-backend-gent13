const {
  getLogger,
} = require('../core/logging');
const deliveryRepo = require('../repository/delivery');
const orderRepo = require('../repository/order');
const orderItemRepo = require('../repository/orderItem');
const productService = require("./product");

function makeChars(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getAllFromCompany = async (companyId) => {
  debugLog(`Fetching all orders of company with id: ${companyId}`);

  if (companyId) {
    const mainOrders = [];
    const orders = await orderRepo.findAllOfCompany(companyId);
    // const orderItems = [];
    for (const order of orders) {
      const delivery = await deliveryRepo.findByOrder(order.id);
      const orderItem = await orderItemRepo.findByOrder(order.id);
      const products = [];
      for (const element of orderItem) {
        const product = await productService.getById(element.productId);
        const newProduct = {
          name: product.productName,
          quantity: element.quantity,
          unitPrice: product.price,
          totalPrice: element.netPrice,
        };
        products.push(newProduct);
      }
      // orderItems.push(orderItem);
      mainOrders.push({
        orderId: order.id,
        date: order.orderDateTime,
        street: delivery.street,
        streetNumber: delivery.number,
        zipCode: delivery.postCode,
        country: delivery.country,
        products,
        totalPrice: orderItem.totalPrice,
        packaging: orderItem.packagingId,
        trackAndtrace: delivery.trackAndtrace,
      });
    }
    return mainOrders;
  }
    throw ServiceError.notFound('No companyId provided');
};

const create = async ({
  buyerId,
  customerId,
  packagingId,
  currencyId,
  netPrice,
  taxPrice,
  totalPrice,
  products,
  street,
  number,
  postcode,
  country,
  additionalInformation,
}) => {
  const orderReference = `REF${makeChars(13)}`;
  const orderId = orderRepo.create({
    buyerId,
    customerId,
    packagingId,
    currencyId,
    orderReference,
    orderDateTime: new Date().toString(),
    netPrice,
    taxPrice,
    totalPrice,
});
  for (const product of products) {
    orderItemRepo.create({
      orderId,
      productId: product.id,
      quantity: product.quantity,
      netPrice: product.netPrice,
});
  }

  const trackAndtrace = `${Date.now()}${makeChars(5)}`;

  deliveryRepo.create({
    transporterId: null,
    orderId,
    packagingId,
    street,
    number,
    postcode,
    country,
    additionalInformation,
    trackAndtrace,
    deliveryStatus: 0,
  });
};

module.exports = {
  getAllFromCompany,
  create,
};