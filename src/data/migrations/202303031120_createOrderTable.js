const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order, (table) => {
      table.increments('id').unique();
      table.string('buyerEmail', 64)
        .notNullable();
      table.integer('customerId')
        .notNullable()
        .unsigned();
      table.string('currencyId').notNullable();
      table.string('orderReference', 64).notNullable();
      table.datetime('orderDateTime').notNullable();
      table.double('netPrice').notNullable();
      table.double('taxPrice').notNullable();
      table.double('totalPrice').notNullable();
      table.foreign('customerId', 'fk_Order_Company')
        .references(`${tables.company}.id`)
        .onDelete('CASCADE');;
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.order),
};