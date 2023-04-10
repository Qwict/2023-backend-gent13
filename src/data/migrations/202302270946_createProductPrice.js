const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product_price, (table) => {
      table.integer('product_id').unsigned().notNullable();
      table.double('price').notNullable();
      table.integer('quantity').notNullable();
      table.foreign('product_id', 'fk_Price_Product').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.product_price),
};