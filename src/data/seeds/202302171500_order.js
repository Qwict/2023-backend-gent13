const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.orders).insert([
      {
        id: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
        buyerId: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
        customerId: 1,
        fromCompanyId: 1,
        packagingId: 1,
        orderReference: 'REF1',
        orderDateTime: 'Fri Mar 03 2023 15:34:55 GMT+0100 (Central European Standard Time)',
        netPrice: 49.99,
        taxPrice: 0,
        totalPrice: 49.99,
        orderStatus: 0,
      },
    ]);
  },
};
