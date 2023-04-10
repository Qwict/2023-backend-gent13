const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.company).insert([
      {
        id: 2,
        name: 'BVBA MILJAAR',
        logo_img: null,
        country_code: 'BE',
        vat_number: '0684579082',
        street: 'Bekkemmeers',
        street_number: '26',
        zip_code: '8740',
        city: 'Pittem',
        country: 'Belgium',
      },
      {
        id: 1,
        name: 'Qwict',
        logo_img: 'QwictCompanyLogo.png',
        country_code: 'BE',
        vat_number: '0123456789',
        street: 'Overpoortstraat',
        street_number: '104',
        zip_code: '9000',
        city: 'Gent',
        country: 'Belgium',
      },
    ]);
  },
};