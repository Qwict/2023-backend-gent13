const {
  tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.uuid('id').primary().unique();
      table.string('name', 255);
      table.string('first_name', 128);
      table.string('last_name', 128);
      table.string('street', 64);
      table.string('street_number', 16);
      table.string('zip_code', 16);
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
      table.integer('company_id').defaultTo(null).unsigned();
      table.string('role').defaultTo('unemployed');
      table.foreign('company_id', 'fk_User_Company').references(`${tables.company}.id`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.user),
};