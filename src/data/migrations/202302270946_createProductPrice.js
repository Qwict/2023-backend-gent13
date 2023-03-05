const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.productPrice, (table) => {
            table.primary(['productId', 'currencyId']);
            table.integer('productId').unsigned().notNullable();
            table.string('currencyId', 16).notNullable();
            table.integer('price').notNullable();
            table.integer('quantity').notNullable();
            table.foreign('productId', 'fk_Price_Product').references(`${tables.product}.id`).onDelete('CASCADE');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.productPrice),
};