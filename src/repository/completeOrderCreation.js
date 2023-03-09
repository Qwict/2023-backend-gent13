const uuid = require('uuid');
const {
  tables,
  getKnex,
} = require('../data');

const create = async (user, {
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
}) => {
  const knex = getKnex();
  let orderId;
  try {
  await knex.transaction(async (trx) => {
  orderId = uuid.v4();

  await trx(tables.order).insert({
    id: orderId,
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
      await trx(tables.orderItem).insert({
        orderId,
        productId: product.id,
        quantity: product.quantity,
        netPrice: product.netPrice,
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
    console.log(error);
  }
  return orderId;
};

module.exports = {
  create,
};