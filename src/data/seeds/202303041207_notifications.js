const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.notification).insert([
    {
      id: 1,
      orderId: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
      companyId: 1,
      date: 'Sat Mar 04 2023 12:09:30 GMT+0100 (Central European Standard Time)',
      text: 'Order by joris',
      status: false,
    },
    ]);
  },
};