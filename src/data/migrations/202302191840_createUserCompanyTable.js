const {
    tables,
} = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.userCompany, (table) => {
      table.increments('id')
        .primary();
      table.uuid('admin')
        .notNullable();
      table.uuid('employee')
        .notNullable();
      table.integer('companyId')
        .unsigned()
        .notNullable();
      table.foreign('admin', 'fk_userCompany_admin')
        .references(`${tables.user}.id`)
        .onDelete('CASCADE');
      table.foreign('employee', 'fk_userCompany_employee')
        .references(`${tables.user}.id`);
      table.foreign('companyId', 'fk_userCompany_companyId')
        .references(`${tables.company}.id`)
        .onDelete('CASCADE');
      });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.userCompany),
};