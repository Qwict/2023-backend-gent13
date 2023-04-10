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

      await trx(tables.order).insert({
        id: orderId,
        buyer_id: user.id,
        customer_id: user.companyId,
        from_company_id: fromCompanyId,
        packaging_id: packagingId,
        order_reference: orderReference,
        order_date_time: new Date().toString(),
        net_price: netPrice,
        tax_price: taxPrice,
        total_price: totalPrice,
        order_status: 0,
      });
      for (const product of products) {
        await trx(tables.order_item).insert({
          order_id: orderId,
          product_id: product.id,
          quantity: product.quantity,
          net_price: product.netPrice * product.quantity,
        });
      }

      await trx(tables.delivery).insert({
        transporter_id: null,
        order_id: orderId,
        packaging_id: packagingId,
        street,
        number,
        zip_code: zipCode,
        city,
        country,
        additional_information: additionalInformation,
        track_and_trace: trackAndtrace,
        delivery_status: 0,
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
      await trx(tables.order).update({
        packaging_id: packagingId,
      }).where('id', id);
      await trx(tables.delivery).update({
        packaging_id: packagingId,
        street,
        number,
        zip_code: zipCode,
        city,
        country,
      }).where('order_id', id);
    });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  create,
  update,
};