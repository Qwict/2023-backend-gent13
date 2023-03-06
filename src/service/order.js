const {
  getLogger,
} = require('../core/logging');
const deliveryRepo = require('../repository/delivery');
const orderRepo = require('../repository/order');
const orderItemRepo = require('../repository/orderItem');
const productService = require("./product");

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
        products: products,
        totalPrice: orderItem.totalPrice,
        packaging: orderItem.packagingId,
        trackAndtrace: delivery.trackAndtrace,
      });
    };
    return mainOrders;
  } else {
    throw ServiceError.notFound('No companyId provided');
  }
};
module.exports = {
  getAllFromCompany,
};