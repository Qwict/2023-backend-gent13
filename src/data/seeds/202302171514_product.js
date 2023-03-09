const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).insert([
      {
        id: 1,
        productCategoryId: 1,
        stock: 500,
        image: null,
        companyId: 1,
      },
      {
        id: 2,
        productCategoryId: 2,
        stock: 1500,
        image: null,
        companyId: 1,
      },
      {
        id: 3,
        productCategoryId: 3,
        stock: 100,
        image: null,
        companyId: 1,
      },
    ]);
  },
};