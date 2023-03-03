const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.productPrice, (table) => {
      table.increments('id');
      table.string('productId', 128).notNullable();
      table.string('currencyId', 16).notNullable();
      table.integer('syncId');
      table.integer('price');
      table.string('unitOfMeasuerId', 16);
      table.datetime('syncDateTime');
      table.integer('quantity');
      table.foreign('productId', 'fk_Price_Product').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.productPrice),
};
