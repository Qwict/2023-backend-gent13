const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.orderItem, (table) => {
            table.increments('id').unique();
            table.integer('orderId').unsigned().notNullable();
            table.string('productId').notNullable();
            table.integer('syncId');
            table.integer('quantity');
            table.string('unitOfMeasureId');
            table.integer('netAmount');
            table.double('netPrice');
            table.foreign('orderId', 'fk_OrderItem_Order').references(`${tables.order}.id`).onDelete('CASCADE');
            table.foreign('productId', 'fk_OrderItem_Product').references(`${tables.product}.id`).onDelete('CASCADE');
          });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.orderItem),
};