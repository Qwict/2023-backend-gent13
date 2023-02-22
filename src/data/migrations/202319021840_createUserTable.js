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
                .notNullable()
                .unique();
            table.string('hash', 255)
                .notNullable()
                .unique();
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};