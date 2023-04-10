const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.order_item).insert([
      {
        order_id: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
        product_id: 4,
        quantity: 1,
        net_price: 49.99,
      },
    ]);
  },
};