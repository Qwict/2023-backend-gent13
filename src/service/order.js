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
const pacakgingService = require('./packaging');

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
    const products = [];
    for (const orderItem of orderItems) {
      const product = await productService.getById(orderItem.productId);
      const newProduct = {
        name: product[0].name,
        quantity: orderItem.quantity,
        unitPrice: product[0].price,
        totalPrice: orderItem.netPrice,
      };
      products.push(newProduct);
    }

    const deliveryService = await deliveryServiceRepo.findById(delivery.transporterId);
    const user = await userService.getById(order.buyerId);
    const company = await companyService.getById(order.customerId);
    const packaging = await pacakgingService.getById(order.packagingId);

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
      products,
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
      const products = [];
      for (const element of orderItem) {
        const product = await productService.getById(element.productId);
        const newProduct = {
          name: product[0].name,
          quantity: element.quantity,
          unitPrice: product.price,
          totalPrice: element.netPrice,
        };
        products.push(newProduct);
      }
      // orderItems.push(orderItem);
      mainOrders.push({
        orderId: order.id,
        user: blameUser.email,
        date: order.orderDateTime,
        productCount: products.length,
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
      const products = [];
      for (const element of orderItem) {
        const product = await productService.getById(element.productId);
        const newProduct = {
          name: product[0].name,
          quantity: element.quantity,
          unitPrice: product[0].price,
          totalPrice: element.netPrice,
        };
        products.push(newProduct);
      }
      // orderItems.push(orderItem);
      mainOrders.push({
        orderId: order.id,
        user: blameUser.email,
        date: order.orderDateTime,
        productCount: products.length,
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
  currencyId,
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
  debugLog('Creating new order');
  const user = await userService.getByToken(token);
  // const user = { id: '4b09960e-0864-45e0-bab6-6cf8c7fc4626', companyId: 1 };
  const orderReference = `REF${makeChars(13)}`;

  const trackAndtrace = `${Date.now()}${makeChars(5)}`;

  const id = await orderFactory.create(user, {
    packagingId,
    currencyId,
    orderReference,
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
    trackAndtrace,
  });
  const mainOrder = await getById(id);
  return mainOrder;
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