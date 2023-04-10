const {
  tables,
  getKnex,
} = require('../data');

const findByTrackAndTrace = async (trackAndtrace) => {
  const delivery = await getKnex()(tables.delivery).where('track_and_trace', trackAndtrace).first();
  return delivery;
};

const findByPackaging = async (packagingId) => {
  const deliveries = await getKnex()(tables.delivery).where('packaging_id', packagingId);
  return deliveries;
};

async function findByOrder(orderId) {
  const delivery = await getKnex()(tables.delivery).where('order_id', orderId).first();
  return delivery;
}

const findByTransporter = async (transporterId) => {
  const deliveries = await getKnex()(tables.delivery).where('transporter_id', transporterId).first();
  return deliveries;
};

const findAll = async () => {
  const deliveries = await getKnex()(tables.delivery).select();
  return deliveries;
};

const create = async ({
  transporterId, orderId, packagingId, street, number, zipCode, city, country, additionalInformation, trackAndtrace, deliveryStatus,
}) => {
  const id = await getKnex()(tables.delivery).insert({
    transporter_id: transporterId,
    order_id: orderId,
    packaging_id: packagingId,
    street,
    number,
    zip_code: zipCode,
    city,
    country,
    additional_information: additionalInformation,
    track_and_trace: trackAndtrace,
    delivery_status: deliveryStatus,
  });
  return id;
};

const updateById = async (
  id,
  packagingId,
  street,
  number,
  zipCode,
  city,
  country,
) => {
  await getKnex()(tables.delivery).update({
    packaging_id: packagingId,
    street,
    number,
    zip_code: zipCode,
    city,
    country,
  }).where('order_id', id);
  return id;
};

module.exports = {
  findByTrackAndTrace,
  findByOrder,
  findAll,
  findByTransporter,
  findByPackaging,
  create,
  updateById,
};