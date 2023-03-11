const {
  tables,
  getKnex,
} = require('../data');

const findByTrackAndTrace = async (trackAndtrace) => {
    const delivery = await getKnex()(tables.delivery).where('trackAndtrace', trackAndtrace).first();
    return delivery;
};

const findByPackaging = async (packagingId) => {
  const deliveries = await getKnex()(tables.delivery).where('packagingId', packagingId);
  return deliveries;
};

async function findByOrder(orderId) {
  const delivery = await getKnex()(tables.delivery).where('orderId', orderId).first();
  return delivery;
}

const findByTransporter = async (transporterId) => {
  const deliveries = await getKnex()(tables.delivery).where('transporterId', transporterId).first();
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
    transporterId,
    orderId,
    packagingId,
    street,
    number,
    zipCode,
    city,
    country,
    additionalInformation,
    trackAndtrace,
    deliveryStatus,
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
    packagingId,
    street,
    number,
    zipCode,
    city,
    country,
  }).where('orderId', id);
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