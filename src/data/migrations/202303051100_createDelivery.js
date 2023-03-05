const {
  tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.delivery, (table) => {
            table.integer('transporterId');
            table.string('track&trace', 128).notNullable();
            table.string('street', 64).notNullable();
            table.integer('number').notNullable();
            table.integer('postCode').notNullable();
            table.string('country', 32).notNullable();
            table.string('verificationCode', 128).notNullable();
            table.string('additionalInformation', 1024);
            // 0 is processing, 1 is departed ...
            table.integer('deliveryStatus');
            table.foreign('transporterId', 'fk_Delivery_Company').references(`${tables.company}.id`);
            table.foreign('track&trace', 'fk_Delivery_Order').references(`${tables.order}.id`).onDelete('CASCADE');
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.delivery),
};