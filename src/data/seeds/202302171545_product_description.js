module.exports = {
  seed: async (knex) => {
    await knex('productdescription').insert([
    {
      productId: 1,
      languageId: "nl",
      productName: "Ski-lat",
      productShortDescription: "oi",
      productLongDescription: "oioi",
    },
    {
      productId: 2,
      languageId: "nl",
      productName: "Body lotion",
      productShortDescription: "oi",
      productLongDescription: "oioi",
    },
    {
      productId: 3,
      languageId: "nl",
      productName: "HOGent server",
      productShortDescription: "oi",
      productLongDescription: "oioioi",
    },
    ]);
  },
};