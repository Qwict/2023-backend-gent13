const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.productPrice).insert([
      {
        productId: 4,
        currencyId: 'EUR',
        price: 215.0,
        quantity: 1,
      },
      {
        productId: 5,
        currencyId: 'EUR',
        price: 219.0,
        quantity: 1,
      },
      {
        productId: 6,
        currencyId: 'EUR',
        price: 92.99,
        quantity: 1,
      },
      {
        productId: 7,
        currencyId: 'EUR',
        price: 809.0,
        quantity: 1,
      },
      {
        productId: 8,
        currencyId: 'EUR',
        price: 579.0,
        quantity: 1,
      },
      {
        productId: 9,
        currencyId: 'EUR',
        price: 1145.0,
        quantity: 1,
      },
      {
        productId: 10,
        currencyId: 'EUR',
        price: 1969.0,
        quantity: 1,
      },
      {
        productId: 11,
        currencyId: 'EUR',
        price: 1889.0,
        quantity: 1,
      },
      {
        productId: 12,
        currencyId: 'EUR',
        price: 1089.0,
        quantity: 1,
      },

      {
        productId: 13,
        currencyId: 'EUR',
        price: 1369.0,
        quantity: 1,
      },

      {
        productId: 14,
        currencyId: 'EUR',
        price: 2199.0,
        quantity: 1,
      },

      {
        productId: 15,
        currencyId: 'EUR',
        price: 1599.0,
        quantity: 3,
      },

      {
        productId: 16,
        currencyId: 'EUR',
        price: 1699.0,
        quantity: 1,
      },

      {
        productId: 17,
        currencyId: 'EUR',
        price: 1309.0,
        quantity: 1,
      },
      {
        productId: 18,
        currencyId: 'EUR',
        price: 136.99,
        quantity: 1,
      },

      {
        productId: 19,
        currencyId: 'EUR',
        price: 75.99,
        quantity: 1,
      },

      {
        productId: 20,
        currencyId: 'EUR',
        price: 10000.0,
        quantity: 1,
      },

    ]);
  },
};