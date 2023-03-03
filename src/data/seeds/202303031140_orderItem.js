module.exports = {
  seed: async (knex) => {
    await knex('orderitem').insert([
    {
      orderId: 1,
      productId: 1,
      quantity: 1,
      netPrice: 49.99,
    },
    ]);
  },
};