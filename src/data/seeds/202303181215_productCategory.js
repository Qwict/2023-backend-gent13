const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.product_category).insert([
      {
        id: 1,
        category_id: 2,
        product_id: 4,
      },
      {
        id: 18,
        category_id: 3,
        product_id: 4,
      },
      {
        id: 2,
        category_id: 1,
        product_id: 5,
      },
      {
        id: 3,
        category_id: 2,
        product_id: 6,
      },
      {
        id: 4,
        category_id: 4,
        product_id: 7,
      },
      {
        id: 5,
        category_id: 4,
        product_id: 8,
      },
      {
        id: 6,
        category_id: 4,
        product_id: 9,
      },
      {
        id: 7,
        category_id: 4,
        product_id: 10,
      },
      {
        id: 8,
        category_id: 4,
        product_id: 11,
      },
      {
        id: 9,
        category_id: 6,
        product_id: 12,
      },
      {
        id: 10,
        category_id: 5,
        product_id: 13,
      },
      {
        id: 11,
        category_id: 6,
        product_id: 14,
      },
      {
        id: 12,
        category_id: 6,
        product_id: 15,
      },
      {
        id: 13,
        category_id: 6,
        product_id: 16,
      },
      {
        id: 14,
        category_id: 6,
        product_id: 17,
      },
      {
        id: 15,
        category_id: 3,
        product_id: 18,
      },
      {
        id: 16,
        category_id: 3,
        product_id: 19,
      },
      {
        id: 17,
        category_id: 2,
        product_id: 20,
      },
    ]);
  },
};