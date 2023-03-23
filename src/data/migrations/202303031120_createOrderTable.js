const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order, (table) => {
      table.uuid('id').primary().unique();
      table.uuid('buyerId').notNullable();
      table.integer('customerId').unsigned().notNullable();
      table.integer('packagingId').unsigned().notNullable();
      table.string('currencyId').notNullable();
      table.string('orderReference', 64).notNullable();
      table.string('orderDateTime').notNullable();
      table.double('netPrice').notNullable();
      table.double('taxPrice').notNullable();
      table.double('totalPrice').notNullable();
      // 0 is geplaatst, 1 is volgende stage ...
      table.integer('orderStatus');
      table.foreign('customerId', 'fk_Order_Company').references(`${tables.company}.id`).onDelete('CASCADE');
      table.foreign('buyerId', 'fk_Order_User').references(`${tables.user}.id`);
      table.foreign('packagingId', 'fk_Order_Packaging').references(`${tables.packaging}.id`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.order),
};