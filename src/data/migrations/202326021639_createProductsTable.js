const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.product, (table) => {
            table.uuid('id').primary();
            table.string('naam', 255);
            table.string('foto', 255);
            table.string('omschrijving', 255);
            table.integer('prijs');
            table.integer('aantalInStock');
            table.string('vermoedelijkeLevertijd', 255);
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.product),
};