module.exports = {
  seed: async (knex) => {
    await knex('product').insert([
      {
        id: "Product 1",
        productCategoryId: 1,
        stock: 500,
      },
      {
        id: "Product 2",
        productCategoryId: 2,
        stock: 1500,
      },
      {
        id: "Product 3",
        productCategoryId: 3,
        stock: 100,
      },

    ]);
  },
};