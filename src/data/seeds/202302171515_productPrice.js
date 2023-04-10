const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.product_price).insert([
      {
        product_id: 4,
        price: 215.99,
        quantity: 1,
      },

      {
        product_id: 5,
        price: 219.99,
        quantity: 1,
      },

      {
        product_id: 6,

        price: 92.99,
        quantity: 1,
      },

      {
        product_id: 7,
        price: 809.59,
        quantity: 1,
      },

      {
        product_id: 8,

        price: 579.49,
        quantity: 1,
      },

      {
        product_id: 9,
        price: 1147.99,
        quantity: 1,
      },
      {
        product_id: 10,
        price: 1969.0,
        quantity: 1,
      },

      {
        product_id: 11,
        price: 1889.49,
        quantity: 1,
      },

      {
        product_id: 12,
        price: 1089.09,
        quantity: 1,
      },

      {
        product_id: 13,
        price: 1369.0,
        quantity: 1,
      },

      {
        product_id: 14,
        price: 2199.89,
        quantity: 1,
      },

      {
        product_id: 15,

        price: 1599.49,
        quantity: 3,
      },

      {
        product_id: 16,
        price: 1699.49,
        quantity: 1,
      },

      {
        product_id: 17,

        price: 1309.39,
        quantity: 1,
      },

      {
        product_id: 18,
        price: 136.99,
        quantity: 1,
      },

      {
        product_id: 19,
        price: 75.99,
        quantity: 1,
      },

      {
        product_id: 20,
        price: 29.99,
        quantity: 1,
      },

    ]);
  },
};