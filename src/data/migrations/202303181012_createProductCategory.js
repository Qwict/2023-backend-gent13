const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product_category, (table) => {
      table.increments('id').unique();
      table.integer('category_id').unsigned().notNullable();
      table.integer('product_id').unsigned().notNullable();
      table.foreign('category_id').references(`${tables.category}.id`).onDelete('CASCADE');
      table.foreign('product_id').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.product_category),
};