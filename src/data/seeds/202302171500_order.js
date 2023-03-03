module.exports = {
  seed: async (knex) => {
    await knex('order').insert([
      {
        id: 1,
        customerId: "4b09960e-0864-45e0-bab6-6cf8c7fc4626",
        orderDateTime: "Fri Mar 03 2023 15:34:55 GMT+0100 (Central European Standard Time)",
        netAmount: 49.99,
        taxAmount: 0,
        totalAmount: 49.99,
        currencyId: "EUR",
      },
    ]);
  },
};