module.exports = {
  seed: async (knex) => {
    await knex('notification').insert([
    {
      id: 1,
      orderId: 1,
      companyId: 1,
      date: 'Sat Mar 04 2023 12:09:30 GMT+0100 (Central European Standard Time)',
      text: 'Order by joris',
      status: false,
    }
    ]);
  },
};