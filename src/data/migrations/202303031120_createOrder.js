const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order, (table) => {
      table.uuid('id').primary().unique();
      table.uuid('buyer_id').notNullable();
      table.integer('customer_id').unsigned().notNullable();
      table.integer('from_company_id').unsigned().notNullable();
      table.integer('packaging_id').unsigned().notNullable();
      table.string('order_reference', 64).notNullable();
      table.string('order_date_time').notNullable();
      table.double('net_price').notNullable();
      table.double('tax_price').notNullable();
      table.double('total_price').notNullable();
      // 0 is geplaatst, 1 is volgende stage ...
      table.integer('order_status');
      table.foreign('customer_id', 'fk_Order_Company').references(`${tables.company}.id`).onDelete('CASCADE');
      table.foreign('buyer_id', 'fk_Order_User').references(`${tables.user}.id`);
      table.foreign('packaging_id', 'fk_Order_Packaging').references(`${tables.packaging}.id`);
      table.foreign('from_company_id', 'fk_Order_Company2').references(`${tables.company}.id`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.order),
};