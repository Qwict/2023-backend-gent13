const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.productPrice).insert([
      {
        productId: 1,
        currencyId: 'EUR',
        price: 49.99,
        quantity: 1,
      },
      {
        productId: 2,
        currencyId: 'EUR',
        price: 25.0,
        quantity: 1,
      },
      {
        productId: 3,
        currencyId: 'EUR',
        price: 10000,
        quantity: 3,
      },
    ]);
  },
};
