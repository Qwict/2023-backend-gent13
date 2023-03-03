const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.order, (table) => {
            table.increments('id').unique();
            table.integer('syncId');
            table.string('customerId', 32).notNullable();
            table.string('orderReference', 64);
            table.datetime('orderDateTime');
            table.integer('netAmount');
            table.double('taxAmount');
            table.double('totalAmount');
            table.string('currencyId');
            table.foreign('customerId', 'fk_User_Order').references(`${tables.user}.uuid`).onDelete('CASCADE');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.order),
};