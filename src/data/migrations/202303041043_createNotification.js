const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.notification, (table) => {
      table.increments('id').unique();
      table.uuid('orderId').notNullable();
      table.integer('companyId').unsigned().notNullable();
      table.string('date').notNullable();
      table.string('text', 128);
      table.boolean('status');
      table.foreign('orderId', 'fk_Notification_Order').references(`${tables.order}.id`).onDelete('CASCADE');
      table.foreign('companyId', 'fk_Notification_Company').references(`${tables.company}.id`).onDelete('CASCADE');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.notification),
};