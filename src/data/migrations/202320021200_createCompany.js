const {
    tables
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(table.Company, (table) => {
            table.increments('id')
                .primary();
            table.string('name', 255);
        })
    }
}