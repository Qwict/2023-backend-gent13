// Seed only includes first 20 objects of dataset
module.exports = {
  seed: async (knex) => {
    await knex('productprice').insert([
      {
        productId: 1,
        currencyId: "EUR",
        price: 49.99,
        quantity: 1,
      },
      {
        productId:  2,
        currencyId: "EUR",
        price: 25.00,
        quantity: 1,
      },
      {
        productId: 3,
        currencyId: "EUR",
        price: 10000,
        quantity: 3,
      },
    ]);
  },
};