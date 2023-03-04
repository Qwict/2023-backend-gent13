const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.productMeasure, (table) => {
            table.integer('productId').unsigned().notNullable().primary();
            table.string('fromUnitOfMeasure', 16);
            table.string('toUnitOfMeasure', 16);
            table.integer('fromQuantity');
            table.integer('toQuantity');
            table.foreign('productId', 'fk_Measure_Product').references(`${tables.product}.id`).onDelete('CASCADE');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.productMeasure),
};