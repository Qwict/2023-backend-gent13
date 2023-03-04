const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.category, (table) => {
      table.increments('id').unique();
      table.string('name').notNullable();
      table.string('description', 256);
      // In case we want an image for each category header
      table.string('categoryImg');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.category),
};