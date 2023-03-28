const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.productCategory, (table) => {
      table.increments('id').unique();
      table.integer('categoryId').unsigned().notNullable();
      table.integer('productId').unsigned().notNullable();
      table.foreign('categoryId').references(`${tables.category}.id`).onDelete('CASCADE');
      table.foreign('productId').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.productCategory),
};