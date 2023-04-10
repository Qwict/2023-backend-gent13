const {
    tables,
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.delivery, (table) => {
            table.integer('transporter_id').unsigned().nullable();
            // order_id = verificationCode
            table.uuid('order_id', 128).notNullable();
            table.integer('packaging_id').unsigned().notNullable();
            table.string('street', 64).notNullable();
            table.string('number').notNullable();
            table.string('zip_code').notNullable();
            table.string('city', 64).notNullable();
            table.string('country', 32).notNullable();
            table.string('additional_information', 1024);
            table.string('track_and_trace', 128);
            // 0 is processing, 1 is departed ...
            table.integer('delivery_status');
            table.foreign('transporter_id', 'fk_Delivery_Company').references(`${tables.delivery_service}.id`);
            table.foreign('order_id', 'fk_Delivery_Order').references(`${tables.order}.id`).onDelete('CASCADE');
            table.foreign('packaging_id', 'fk_Delivery_Packaging').references(`${tables.packaging}.id`);
        });
    },
    down: (knex) => knex.schema.dropTableIfExists(tables.delivery),
};