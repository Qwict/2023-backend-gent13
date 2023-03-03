const {
    tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable("company", (table) => {
            table.increments('id').unique();
            table.string('name', 128);
            table.string('logoImg', 512);
            table.string('countryCode', 16);
            table.string('vatNumber', 64);
            table.string('street', 64);
            table.integer('streetNumber');
            table.integer('zip_code');
            table.string('city', 64);
            table.string('country', 64);
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.company),
};