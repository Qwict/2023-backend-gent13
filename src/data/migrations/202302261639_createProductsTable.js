const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.product, (table) => {
            table.increments('id').notNullable().unique();
            table.integer('productCategoryId').unsigned().notNullable();
            table.integer('stock').notNullable();
            table.foreign('productCategoryId', 'fk_Product_Catgeory').references(`${tables.category}.id`).onDelete('CASCADE');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.product),
};