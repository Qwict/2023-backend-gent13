const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.productDescription, (table) => {
      table.increments('id').notNullable().unique();
      table.integer('productId').unsigned().notNullable();
      table.string('languageId', 16).notNullable();
      table.string('name', 128).notNullable();
      table.string('shortDescription', 256);
      table.string('longDescription', 8192);
      table.foreign('productId', 'fk_Description_Product').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.productDescription),
};