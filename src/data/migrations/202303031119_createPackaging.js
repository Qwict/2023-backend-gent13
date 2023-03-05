const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.packaging, (table) => {
      table.increments('id').unique();
      table.string('name').unique().notNullable();
      table.string('type', 32).notNullable().defaultTo('standard');
      table.double('width').notNullable();
      table.double('height').notNullable();
      table.double('length').notNullable();
      table.double('price').notNullable();
      table.boolean('active').defaultTo(true);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.packaging),
};