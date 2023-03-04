module.exports = {
  seed: async (knex) => {
    await knex('order').insert([
      {
        id: 1,
        buyerId: "4b09960e-0864-45e0-bab6-6cf8c7fc4626",
        customerId: 1,
        currencyId: "EUR",
        orderReference: "REF1",
        orderDateTime: "Fri Mar 03 2023 15:34:55 GMT+0100 (Central European Standard Time)",
<<<<<<< HEAD
        netAmount: 49.99,
        taxAmount: 0,
        totalAmount: 49.99,
        currencyId: "EUR",
      },
=======
        netPrice: 49.99,
        taxPrice: 0,
        totalPrice: 49.99,
      }
>>>>>>> 4d1be03 (Adjusting existing seeds, creating new seeds)
    ]);
  },
};