const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.productPrice).insert([
      {
        productId: 4,
        price: 215.99,
        quantity: 1,
      },

      {
        productId: 5,
        price: 219.99,
        quantity: 1,
      },

      {
        productId: 6,

        price: 92.99,
        quantity: 1,
      },

      {
        productId: 7,
        price: 809.59,
        quantity: 1,
      },

      {
        productId: 8,

        price: 579.49,
        quantity: 1,
      },

      {
        productId: 9,
        price: 1147.99,
        quantity: 1,
      },
      {
        productId: 10,
        price: 1969.0,
        quantity: 1,
      },

      {
        productId: 11,
        price: 1889.49,
        quantity: 1,
      },

      {
        productId: 12,
        price: 1089.09,
        quantity: 1,
      },

      {
        productId: 13,
        price: 1369.0,
        quantity: 1,
      },

      {
        productId: 14,
        price: 2199.89,
        quantity: 1,
      },

      {
        productId: 15,

        price: 1599.49,
        quantity: 3,
      },

      {
        productId: 16,
        price: 1699.49,
        quantity: 1,
      },

      {
        productId: 17,

        price: 1309.39,
        quantity: 1,
      },

      {
        productId: 18,
        price: 136.99,
        quantity: 1,
      },

      {
        productId: 19,
        price: 75.99,
        quantity: 1,
      },

      {
        productId: 20,
        price: 29.99,
        quantity: 1,
      },

    ]);
  },
};