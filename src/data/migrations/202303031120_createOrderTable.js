const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.order, (table) => {
            table.increments('id').unique();
            table.string('buyerId', 64).notNullable();
            table.integer('customerId').notNullable();
            table.string('currencyId').notNullable();
            table.string('orderReference', 64).notNullable();
            table.datetime('orderDateTime').notNullable();
            table.double('netPrice').notNullable();
            table.double('taxPrice').notNullable();
            table.double('totalPrice').notNullable();
            table.foreign('customerId', 'fk_Order_Company').references(`${tables.company}.id`).onDelete('CASCADE');
            table.foreign('buyerId', 'fk_Order_User').references(`${tables.user}.id`).onDelete('SET NULL');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.order),
};