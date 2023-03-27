const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.productCategory).insert([
      {
        id: 1,
        categoryId: 2,
        productId: 4,
      },
      {
        id: 18,
        categoryId: 3,
        productId: 4,
      },
      {
        id: 2,
        categoryId: 1,
        productId: 5,
      },
      {
        id: 3,
        categoryId: 2,
        productId: 6,
      },
      {
        id: 4,
        categoryId: 4,
        productId: 7,
      },
      {
        id: 5,
        categoryId: 4,
        productId: 8,
      },
      {
        id: 6,
        categoryId: 4,
        productId: 9,
      },
      {
        id: 7,
        categoryId: 4,
        productId: 10,
      },
      {
        id: 8,
        categoryId: 4,
        productId: 11,
      },
      {
        id: 9,
        categoryId: 6,
        productId: 12,
      },
      {
        id: 10,
        categoryId: 5,
        productId: 13,
      },
      {
        id: 11,
        categoryId: 6,
        productId: 14,
      },
      {
        id: 12,
        categoryId: 6,
        productId: 15,
      },
      {
        id: 13,
        categoryId: 6,
        productId: 16,
      },
      {
        id: 14,
        categoryId: 6,
        productId: 17,
      },
      {
        id: 15,
        categoryId: 3,
        productId: 18,
      },
      {
        id: 16,
        categoryId: 3,
        productId: 19,
      },
      {
        id: 17,
        categoryId: 2,
        productId: 20,
      },
    ]);
  },
};