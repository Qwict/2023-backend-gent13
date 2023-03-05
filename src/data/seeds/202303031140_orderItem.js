module.exports = {
  seed: async (knex) => {
    await knex('orderitem').insert([
    {
      orderId: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
      productId: 1,
      quantity: 1,
      netPrice: 49.99,
    },
    ]);
  },
};