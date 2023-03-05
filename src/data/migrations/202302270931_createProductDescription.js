const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.productDescription, (table) => {
      table.increments('id');
      table.string('productId', 128).notNullable();
      table.string('languageId', 16).notNullable();
      table.integer('syncId');
      table.string('productName', 128);
      table.string('productListerDescription', 256);
      table.string('productShortDescription', 256);
      table.string('productLongDescription', 512);
      table.foreign('productId', 'fk_Description_Product').references(`${tables.product}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.productDescription),
};
