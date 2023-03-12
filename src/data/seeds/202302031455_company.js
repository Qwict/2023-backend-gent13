const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.company).insert([
      {
        id: 1,
        name: 'BVBA MILJAAR',
        logoImg: null,
        countryCode: "BE",
        vatNumber: "0684579082",
        street: "Bekkemmeers",
        streetNumber: "26",
        zipCode: "8740",
        city: "Pittem",
        country: "Belgium",
      },
      {
        id: 2,
        name: 'Qwict',
        logoImg: null,
        countryCode: "BE",
        vatNumber: "0123456789",
        street: "Overpoortstraat",
        streetNumber: '104',
        zipCode: '9000',
        city: "Gent",
        country: "Belgium",
      },
    ]);
  },
};