const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.notification, (table) => {
      table.uuid('id').primary().unique();
      table.uuid('orderId').nullable();
      table.uuid('userId').nullable();
      table.integer('companyId').unsigned().nullable();
      table.string('date').notNullable();
      table.string('audience', 128).notNullable().defaultTo('private');
      table.string('subject', 128).defaultTo('Order information');
      table.string('text', 512);
      table.string('readBy', 255);
      table.string('archivedBy', 255);
      table.boolean('status');
      table.boolean('archived');
      table.foreign('orderId', 'fk_Notification_Orders').references(`${tables.orders}.id`).onDelete('SET NULL');
      table.foreign('companyId', 'fk_Notification_Company').references(`${tables.company}.id`).onDelete('SET NULL');
      table.foreign('userId', 'fk_Notification_User').references(`${tables.user}.id`).onDelete('SET NULL');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.notification),
};
