const { getLogger } = require('../core/logging');
const deliveryRepo = require('../repository/delivery');
const orderRepo = require('../repository/order');
const deliveryServiceRepo = require('../repository/deliveryService');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getByTrackAndTrace = async ({ trackCode, verificationCode }) => {
  debugLog(`Fetching delivery with trackAndtrace ${trackCode}`);
  const delivery = await deliveryRepo.findByTrackAndTrace(trackCode);

  if (!delivery) {
    throw ServiceError.notFound(`Delivery with track and trace ${trackCode} does not exist`, {
      trackCode,
    });
  }

  const order = await orderRepo.findById(delivery.orderId);

  if (order.orderReference !== verificationCode) {
    throw ServiceError.forbidden('Verificationcode is not valid!');
  }

  const deliveryService = await deliveryServiceRepo.findById(delivery.transporterId);

  const bundledDelivery = {
    transporter: {
      name: deliveryService ? deliveryService.name : '',
      email: deliveryService ? deliveryService.email : '',
      phone: deliveryService ? deliveryService.phone : undefined,
    },
    street: delivery.street,
    number: delivery.number,
    zipCode: delivery.zipCode,
    city: delivery.city,
    country: delivery.country,
    additionalInformation: delivery.additionalInformation,
    deliveryStatus: delivery.deliveryStatus,
  };

  return bundledDelivery;
};

module.exports = {
  getByTrackAndTrace,
};