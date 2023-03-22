const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.uuid('id').primary().unique();
      table.string('name', 255);
      table.string('firstName', 128);
      table.string('lastName', 128);
      table.string('street', 64);
      table.string('streetNumber', 16);
      table.string('zipCode', 16);
      table.string('city', 64);
      table.string('country', 32);
      table.string('email', 255)
        .notNullable()
        .unique();
      table.string('salt', 255)
        .notNullable()
        .unique();
      table.string('hash', 255)
        .notNullable()
        .unique();
      table.integer('companyId').defaultTo(null).unsigned();
      table.string('role').defaultTo('unemployed');
      table.foreign('companyId', 'fk_User_Company').references(`${tables.company}.id`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.user),
};