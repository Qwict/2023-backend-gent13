// Seed only includes first 20 objects of dataset
module.exports = {
  seed: async (knex) => {
    await knex('productprice').insert([
      {
        productId: "Product 1",
        currencyId: "EUR",
        price: 49.99,
        quantity: 1,
      },
      {
        productId: "Product 2",
        currencyId: "EUR",
        price: 25.00,
        quantity: 1,
      },
      {
        productId: "Product 3",
        currencyId: "EUR",
        price: 199.99,
        quantity: 3,
      },
    ]);
  },
};