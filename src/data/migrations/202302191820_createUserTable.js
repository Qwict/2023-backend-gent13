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
      table.boolean('companyVerified')
        .defaultTo(false);
      // must be employee | admin | warehouseman
      table.string('role', 16)
        .defaultTo('employee');
      table.foreign('companyId', 'fk_User_Company').references(`${tables.company}`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.user),
};