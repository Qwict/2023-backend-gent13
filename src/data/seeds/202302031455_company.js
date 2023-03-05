const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
      await knex(tables.company).insert([{
          id: 1,
          name: 'BVBA MILJAAR',
          logoImg: null,
          countryCode: "BE",
          vatNumber: "0684579082",
          street: "Bekkemmeers",
          streetNumber: "26",
          zip_code: "8740",
          city: "Pittem",
          country: "Belgium",
      }]);
  },
};