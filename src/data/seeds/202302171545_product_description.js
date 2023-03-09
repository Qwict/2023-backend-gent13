const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.productDescription).insert([
      {
        productId: 1,
        languageId: 'nl',
        name: 'Ski-lat',
        shortDescription: 'oi',
        longDescription: 'oioi',
      },
      {
        productId: 1,
        languageId: 'en',
        name: 'Ski slats',
        shortDescription: 'oi',
        longDescription: 'oioi',
      },
      {
        productId: 2,
        languageId: 'nl',
        name: 'Body lotion',
        shortDescription: 'oi',
        longDescription: 'oioi',
      },
      {
        productId: 3,
        languageId: 'nl',
        name: 'HOGent server',
        shortDescription: 'oi',
        longDescription: 'oioioi',
      },
    ]);
  },
};