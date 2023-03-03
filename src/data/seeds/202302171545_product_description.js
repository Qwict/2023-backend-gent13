module.exports = {
  seed: async (knex) => {
    await knex('productdescripion').insert([
    {
      productId: "Product 1",
      languageId: "nl",
      productName: "Ski-lat",
      productShortDescription:"oi",
      productLongDescription: "oioi",
    },
    {
      productId: "Product 2",
      languageId: "nl",
      productName: "baby vest",
      productShortDescription:"oi",
      productLongDescription: "oioi",
    },
    {
      productId: "Product 3",
      languageId: "nl",
      productName: "HOGent server",
      productShortDescription:"oi",
      productLongDescription: "oioioi",
    },
    ]);
  },
};