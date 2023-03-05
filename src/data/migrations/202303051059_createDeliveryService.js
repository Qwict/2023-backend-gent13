const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
      await knex.schema.createTable(tables.deliveryService, (table) => {
          table.increments('id').unique();
          table.string('name', 128).unique().notNullable();
          table.string('phoneNumber', 64);
          table.string('email', 128).notNullable();
          table.string('vatNumber', 64).notNullable();
          table.string('trackandtraceInfo', 256);
          table.boolean('actief');
      });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.deliveryService),
};