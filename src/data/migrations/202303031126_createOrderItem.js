const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order_item, (table) => {
      table.primary(['order_id', 'product_id']);
      table.uuid('order_id').notNullable();
      table.integer('product_id').unsigned().notNullable();
      table.integer('quantity').notNullable();
      table.double('net_price').notNullable();
      table.foreign('order_id', 'fk_OrderItem_Order').references(`${tables.order}.id`).onDelete('CASCADE');
      table.foreign('product_id', 'fk_OrderItem_Product').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.order_item),
};