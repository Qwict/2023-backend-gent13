const {
    tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.product, (table) => {
            table.increments('id').notNullable().unique();
            // table.integer('productCategoryId').unsigned().nullable();
            table.integer('stock').notNullable();
            table.string('image', 512).defaultTo(null);
            table.integer('company_id').unsigned().notNullable();
            // table.foreign('productCategoryId', 'fk_Product_Catgeory').references(`${tables.category}.id`).onDelete('SET NULL');
            table.foreign('company_id', 'fk_Product_Company').references(`${tables.company}.id`).onDelete('CASCADE');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.product),
};