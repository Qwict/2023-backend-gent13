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
      table.integer('companyId')
        .defaultTo(null)
        .unsigned();
      table.boolean('companyVerified')
        .defaultTo(false);
      // must be unemployed | employee | admin | warehouseman
      table.string('role', 16)
        .defaultTo('unemployed');
      table.foreign('companyId', 'fk_User_Company').references(`${tables.company}`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.user),
};