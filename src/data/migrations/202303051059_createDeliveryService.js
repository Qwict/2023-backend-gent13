const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.delivery_service, (table) => {
      table.increments('id').unique();
      table.string('name', 128).unique().notNullable();
      table.string('phone_number', 64);
      table.string('email', 128).notNullable();
      table.string('vat_number', 64).notNullable();
      table.string('track_and_trace_info', 256);
      table.boolean('active');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.delivery_service),
};