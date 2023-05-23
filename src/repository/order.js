const uuid = require('uuid');
const {
  tables,
  getKnex,
} = require('../data');

async function findById(id) {
  const order = await getKnex()(tables.orders).where('id', id).first();
  return order;
}

const findAllByPackaging = async (packagingId) => {
  const orders = getKnex()(tables.orders).where('packagingId', packagingId)
    .orderBy('orderDateTime');
  return orders;
};

const findAllOfBuyer = async (buyerId) => {
  const orders = await getKnex()(tables.orders).where('buyerId', buyerId)
    .orderBy('orderDateTime');
  return orders;
};

const findAllOfCompany = async (customerId) => {
  const orders = await getKnex()(tables.orders).where('customerId', customerId)
    .orderBy('orderDateTime');
  return orders;
};

const create = async ({
  buyerId, customerId, packagingId, currencyId, orderReference, orderDateTime, netPrice, taxPrice, totalPrice, orderStatus,
}) => {
  const id = uuid.v4();
  await getKnex()(tables.orders).insert({
    id,
    buyerId,
    customerId,
    packagingId,
    currencyId,
    orderReference,
    orderDateTime,
    netPrice,
    taxPrice,
    totalPrice,
    orderStatus,
  });
  return id;
};

const updateById = async (id, packagingId) => {
  await getKnex()(tables.orders).update({
    packagingId,
  }).where('id', id);
  return id;
};

module.exports = {
  findById,
  findAllOfCompany,
  findAllOfBuyer,
  findAllByPackaging,
  create,
  updateById,
};