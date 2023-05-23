const uuid = require('uuid');
const {
  tables,
  getKnex,
} = require('../data');

const create = async (user, {
  packagingId,
  fromCompanyId,
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
}) => {
  const knex = getKnex();
  let orderId;
  try {
    await knex.transaction(async (trx) => {
      orderId = uuid.v4();

      await trx(tables.orders).insert({
        id: orderId,
        buyerId: user.id,
        customerId: user.companyId,
        fromCompanyId,
        packagingId,
        orderReference,
        orderDateTime: new Date().toString(),
        netPrice,
        taxPrice,
        totalPrice,
        orderStatus: 0,
      });
      for (const product of products) {
        await trx(tables.orderItem).insert({
          orderId,
          productId: product.id,
          quantity: product.quantity,
          netPrice: product.netPrice * product.quantity,
        });
      }

      await trx(tables.delivery).insert({
        transporterId: null,
        orderId,
        packagingId,
        street,
        number,
        zipCode,
        city,
        country,
        additionalInformation,
        trackAndtrace,
        deliveryStatus: 0,
      });
      return orderId;
    });
  } catch (error) {
    throw Error(error);
  }
  return orderId;
};

const update = async (id, {
  packagingId, street, number, zipCode, city, country,
}) => {
  try {
    await getKnex().transaction(async (trx) => {
      await trx(tables.orders).update({
        packagingId,
      }).where('id', id);
      await trx(tables.delivery).update({
        packagingId,
        street,
        number,
        zipCode,
        city,
        country,
      }).where('orderId', id);
    });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  create,
  update,
};