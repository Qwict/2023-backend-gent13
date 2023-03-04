module.exports = {
  seed: async (knex) => {
    await knex('product').insert([
      {
        id: 1,
        productCategoryId: 1,
        stock: 500,
      },
      {
        id: 2,
        productCategoryId: 2,
        stock: 1500,
      },
      {
        id: 3,
        productCategoryId: 3,
        stock: 100,
      },

    ]);
  },
};