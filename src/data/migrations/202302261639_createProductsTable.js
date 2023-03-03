const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.product, (table) => {
            table.string('id', 128).notNullable().primary();
            table.integer('syncId');
            table.integer('stock');
            table.string('unitOfMeasureId', 32);
            table.string('productCategoryId', 64);
            table.string('productAvailability', 32);
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.product),
};