const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product_description, (table) => {
      table.primary(['product_id', 'language_id']);
      table.integer('product_id').unsigned().notNullable();
      table.string('language_id', 16).notNullable();
      table.string('name', 128).notNullable();
      table.string('short_description', 256);
      table.string('long_description', 8192);
      table.foreign('product_id', 'fk_Description_Product').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.product_description),
};