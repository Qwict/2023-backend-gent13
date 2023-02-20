const {
    tables
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.user, (table) => {
            table.uuid('id')
                .primary();
            table.string('name', 255)
                .defaultTo('anon');
            table.string('email', 255)
                .notNullable()
                .unique();
            table.string('salt', 255)
                .notNullable();
            table.string('hash', 255)
                .notNullable();
            table.foreign('company_id', 'fk_user_company')
                .references(`${tables.company}.id`)
                .onDelete('CASCADE');
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};