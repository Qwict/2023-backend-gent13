const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.notification, (table) => {
      table.uuid('id').primary().unique();
      table.uuid('order_id').nullable();
      table.uuid('user_id').nullable();
      table.integer('company_id').unsigned().nullable();
      table.string('date').notNullable();
      table.string('audience', 128)
        .notNullable()
        .defaultTo('private');
      table.string('subject', 128)
        .defaultTo('Order information');
      table.string('text', 512);
      table.string('read_by', 255);
      table.string('archived_by', 255);
      table.boolean('status');
      table.boolean('archived');
      table.foreign('order_id', 'fk_Notification_Order').references(`${tables.order}.id`).onDelete('SET NULL');
      table.foreign('company_id', 'fk_Notification_Company').references(`${tables.company}.id`).onDelete('SET NULL');
      table.foreign('user_id', 'fk_Notification_User').references(`${tables.user}.id`).onDelete('SET NULL');
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.notification),
};