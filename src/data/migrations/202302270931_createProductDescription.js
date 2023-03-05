const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.productDescription, (table) => {
            table.primary(['productId', 'languageId']);
            table.integer('productId').unsigned().notNullable();
            table.string('languageId', 16).notNullable();
            table.string('productName', 128).notNullable();
            table.string('productShortDescription', 256);
            table.string('productLongDescription', 1024);
            table.foreign('productId', 'fk_Description_Product').references(`${tables.product}.id`).onDelete('CASCADE');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.productDescription),
};