const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.company, (table) => {
      table.increments('id').unique();
      table.string('name', 128).notNullable();
      table.string('logoImg', 512);
      table.string('countryCode', 16).notNullable();
      table.string('vatNumber', 64).notNullable();
      table.string('street', 64).notNullable();
      table.string('streetNumber', 32).notNullable();
      table.string('zipCode', 32).notNullable();
      table.string('city', 64).notNullable();
      table.string('country', 64).notNullable();
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.company),
};