// eslint-disable-next-line import/no-extraneous-dependencies
const { round } = require('lodash');

const {
  getLogger,
} = require('../core/logging');
const deliveryRepo = require('../repository/delivery');
const deliveryServiceRepo = require('../repository/deliveryService');
const orderRepo = require('../repository/order');
const orderItemRepo = require('../repository/orderItem');
const productService = require("./product");
const orderFactory = require('../repository/completeOrderCreation');
const userService = require('./user');
const companyService = require('./company');
const packagingService = require('./packaging');
const notificationFactory = require('../repository/notificationFactory');

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
  const order = await orderRepo.findById(id);
  if (order) {
    const orderItems = await orderItemRepo.findByOrder(id);
    const delivery = await deliveryRepo.findByOrder(id);
    const deliveryService = await deliveryServiceRepo.findById(delivery.transporterId);
    const user = await userService.getById(order.buyerId);
    const company = await companyService.getById(order.customerId);
    const packaging = await packagingService.getById(order.packagingId);

    const mainOrders = {
      orderId: order.id,
      orderReference: order.orderReference,
      date: order.orderDateTime,
      street: delivery.street,
      streetNumber: delivery.number,
      zipCode: delivery.zipCode,
      city: delivery.city,
      country: delivery.country,
      user: {
        name: user.name,
        email: user.email,
      },
      company: {
        name: company ? company.name : "No company",
      },
      orderItems,
      totalPrice: order.totalPrice,
      status: order.orderStatus,
      packaging: {
        name: packaging.name,
        type: packaging.type,
        width: packaging.width,
        height: packaging.height,
        length: packaging.length,
      },
      transportService: deliveryService ? deliveryService.name : undefined,
      trackAndtrace: delivery ? delivery.trackAndtrace : undefined,
    };
    return mainOrders;
  }
  throw ServiceError.notFound(`There is no order with id ${id}`);
};

const getAllFromCompany = async (user) => {
  const { companyId } = user;
  if (user.role === 'unemployed' || user.role === 'pending') {
    throw ServiceError.forbidden('You are not a valid employee of this company!');
  }
  debugLog(`Fetching all orders of company with id: ${companyId}`);
  if (companyId) {
    const mainOrders = [];
    const orders = await orderRepo.findAllOfCompany(companyId);
    // const orderItems = [];
    for (const order of orders) {
      // const delivery = await deliveryRepo.findByOrder(order.id);
      const blameUser = await userService.getById(order.buyerId);
      const orderItem = await orderItemRepo.findByOrder(order.id);
      // orderItems.push(orderItem);
      mainOrders.push({
        orderId: order.id,
        user: blameUser.email,
        date: order.orderDateTime,
        productCount: orderItem.length,
        status: order.orderStatus,
        totalPrice: order.totalPrice,
      });
    }
    return mainOrders;
  }
  throw ServiceError.notFound('No companyId provided');
};

const getAllFromUser = async (user) => {
  const { buyerId } = user;
  debugLog(`Fetching all orders of user with id: ${buyerId}`);
  if (buyerId) {
    const mainOrders = [];
    const orders = await orderRepo.findAllOfBuyer(buyerId);
    // const orderItems = [];
    for (const order of orders) {
      // const delivery = await deliveryRepo.findByOrder(order.id);
      const blameUser = await userService.getById(order.buyerId);
      const orderItem = await orderItemRepo.findByOrder(order.id);
      // orderItems.push(orderItem);
      mainOrders.push({
        orderId: order.id,
        user: blameUser.email,
        date: order.orderDateTime,
        productCount: orderItem.length,
        status: order.orderStatus,
        totalPrice: order.totalPrice,
      });
    }
    return mainOrders;
  }
  throw ServiceError.notFound('No buyerId provided');
};

const getAll = async (token) => {
  const user = await userService.getByToken(token);
  if (user.companyId) {
    const orders = await getAllFromCompany(user);
    return orders;
  } if (user) {
    const orders = await getAllFromUser(user);
    return orders;
  }
  throw ServiceError.unauthorized('You are not allowed to view orders');
};

const create = async (token, {
  packagingId,
  netPrice,
  taxPrice,
  totalPrice,
  products,
  street,
  number,
  zipCode,
  city,
  country,
  additionalInformation,
}) => {
  const packaging = await packagingService.getById(packagingId);
  let total = packaging.price;
  const dbProducts = [];
  const companies = new Set();
  for (const product of products) {
    const productFromDb = await productService.getById(product.id, 'nl');
    dbProducts.push({
      id: product.id,
      companyId: productFromDb.companyId,
      quantity: product.quantity,
      netPrice: productFromDb.price,
    });
    companies.add(productFromDb.companyId);
    total += productFromDb.price * product.quantity;
  }
  total += round(total * 0.06, 2);
  if (total !== totalPrice) {
    throw ServiceError.forbidden('You have gesjoemeld met de prijzen!');
  }

  const mainOrders = [];
  const user = await userService.getByToken(token);
  for (const company of companies) {
  debugLog('Creating new order');
  const companyProducts = dbProducts.filter((product) => product.companyId === company);
  const companyNet = companyProducts.reduce((acc, product) => acc + (product.netPrice * product.quantity), 0) + packaging.price;
  const companyTax = round(companyNet * 0.06, 2);
  const companyTotal = companyNet + companyTax;
  // const user = { id: '4b09960e-0864-45e0-bab6-6cf8c7fc4626', companyId: 1 };
  const orderReference = `REF${makeChars(13)}`;
  const trackAndtrace = `${Date.now()}${makeChars(5)}`;

  const id = await orderFactory.create(user, {
    packagingId,
    fromCompanyId: company,
    orderReference,
    netPrice: companyNet,
    taxPrice: companyTax,
    totalPrice: companyTotal,
    products: companyProducts,
    street,
    number,
    zipCode,
    city,
    country,
    additionalInformation,
    trackAndtrace,
  });
  const mainOrder = await getById(id);

  notificationFactory.create({
    orderId: mainOrder.orderId,
    userId: user.id,
    companyId: user.companyId,
    date: mainOrder.date,
    audience: 'company',
    subject: 'order',
    text: 'New order created',
  });

  mainOrders.push(mainOrder);
}
  return mainOrders;
};

const updateById = async (id, {
  packagingId, street, number, zipCode, city, country,
}) => {
  const order = await orderRepo.findById(id);
  if (order.orderStatus === 0) {
    const updateParams = {
      packagingId,
      street,
      number,
      zipCode,
      city,
      country,
    };
    await orderFactory.update(id, updateParams);
    // await orderRepo.updateById(id, packagingId);
    // await deliveryRepo.updateById(id, packagingId, street, number, zipCode, city, country);
  } else {
    throw ServiceError.forbidden(`You can not update this order. orderStatus = ${order.orderStatus}`);
  }
  const updatedOrder = await getById(id);
  return updatedOrder;
};

module.exports = {
  getAll,
  getById,
  // getAllFromCompany,
  create,
  updateById,
};