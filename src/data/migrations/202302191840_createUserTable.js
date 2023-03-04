const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.uuid('id').primary().unique();
      table.string('name', 255)
        .defaultTo('anon');
      table.string('email', 255)
        .notNullable()
        .unique();
      table.string('salt', 255)
        .notNullable()
        .unique();
      table.string('hash', 255)
        .notNullable()
        .unique();
      table.integer('companyId').unsigned().notNullable();
      table.boolean('verificated');
      table.integer('role').defaultTo(0);
      table.foreign('companyId', 'fk_User_Company').references(`${tables.company}`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.user),
};