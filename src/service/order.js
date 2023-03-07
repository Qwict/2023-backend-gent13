const {
  getLogger,
} = require('../core/logging');
const deliveryRepo = require('../repository/delivery');
const orderRepo = require('../repository/order');
const orderItemRepo = require('../repository/orderItem');
const productService = require("./product");
const userService = require('./user');

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

const getById = async (id) => {
  const order = orderRepo.findById(id);
  const orderItems = orderItemRepo.findByOrder(id);
  const delivery = orderItemRepo.findByOrder(id);
  const products = [];
  for (const orderItem of orderItems) {
    const product = await productService.getById(orderItem.productId);
    const newProduct = {
      name: product.productName,
      quantity: orderItem.quantity,
      unitPrice: product.price,
      totalPrice: orderItem.netPrice,
    };
    products.push(newProduct);
  }

  const mainOrders = {
    orderId: order.id,
    date: order.orderDateTime,
    street: delivery.street,
    streetNumber: delivery.number,
    zipCode: delivery.postCode,
    country: delivery.country,
    products,
    totalPrice: order.totalPrice,
    packaging: order.packagingId,
    trackAndtrace: delivery.trackAndtrace,
  };

  return mainOrders;
};

const getAllFromCompany = async (token) => {
  const user = await userService.getByToken(token);
  const { companyId } = user;
  if (user.companyVerified === false) {
    throw ServiceError.forbidden('You are not a valid employee of this company!');
  }
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
        totalPrice: order.totalPrice,
        packaging: order.packagingId,
        trackAndtrace: delivery.trackAndtrace,
      });
    }
    return mainOrders;
  }
    throw ServiceError.notFound('No companyId provided');
};

const create = async (token, {
  packagingId,
  currencyId,
  netPrice,
  taxPrice,
  totalPrice,
  products,
  street,
  number,
  postCode,
  country,
  additionalInformation,
}) => {
  const user = await userService.getByToken(token);
  // const user = { id: '4b09960e-0864-45e0-bab6-6cf8c7fc4626', companyId: 1 };
  const orderReference = `REF${makeChars(13)}`;
  const orderId = await orderRepo.create({
    buyerId: user.id,
    customerId: user.companyId,
    packagingId,
    currencyId,
    orderReference,
    orderDateTime: new Date().toString(),
    netPrice,
    taxPrice,
    totalPrice,
    orderStatus: 0,
});

  for (const product of products) {
    await orderItemRepo.create({
      orderId,
      productId: product.id,
      quantity: product.quantity,
      netPrice: product.netPrice,
});
  }

  const trackAndtrace = `${Date.now()}${makeChars(5)}`;

  await deliveryRepo.create({
    transporterId: null,
    orderId,
    packagingId,
    street,
    number,
    postCode,
    country,
    additionalInformation,
    trackAndtrace,
    deliveryStatus: 0,
  });

  return "GREAT SUCCESS";
};

const updateById = async (id, {
  packagingId, street, number, postCode, country,
 }) => {
  const order = orderRepo.findById(id);
  if (order.orderStatus === 0) {
    await orderRepo.updateById(id, packagingId);
    await deliveryRepo.updateById(id, packagingId, street, number, postCode, country);
  } else {
    throw ServiceError.forbidden(`You can not update this order. orderStatus = ${order.orderStatus}`);
  }
  const updatedOrder = await getById(id);
  return updatedOrder;
};

module.exports = {
  getById,
  getAllFromCompany,
  create,
  updateById,
};