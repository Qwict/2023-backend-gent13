const { tables } = require('..');

module.exports = {

    up: async (knex) => {
        await knex.schema.createTable(tables.orderItem, (table) => {
            table.increments('id').notNullable().unique();
            table.uuid('orderId').notNullable();
            table.integer('productId').unsigned().notNullable();
            table.integer('quantity').notNullable();
            table.double('netPrice').notNullable();
            table.foreign('orderId', 'fk_OrderItem_Order').references(`${tables.orders}.id`).onDelete('CASCADE');
            table.foreign('productId', 'fk_OrderItem_Product').references(`${tables.product}.id`).onDelete('CASCADE');
          });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.orderItem),
};