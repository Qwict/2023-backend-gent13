const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.delivery, (table) => {
      table.integer('transporterId').unsigned().nullable();
      // orderId = verificationCode
      table.uuid('orderId', 128).notNullable();
      table.integer('packagingId').unsigned().notNullable();
      table.string('street', 64).notNullable();
      table.string('number').notNullable();
      table.string('zipCode').notNullable();
      table.string('city', 64).notNullable();
      table.string('country', 32).notNullable();
      table.string('additionalInformation', 1024);
      table.string('trackAndtrace', 128);
      // 0 is processing, 1 is departed ...
      table.integer('deliveryStatus');
      table.foreign('transporterId', 'fk_Delivery_Company').references(`${tables.deliveryService}.id`);
      table.foreign('orderId', 'fk_Delivery_Orders').references(`${tables.orders}.id`).onDelete('CASCADE');
      table.foreign('packagingId', 'fk_Delivery_Packaging').references(`${tables.packaging}.id`);
    });
  },
  down: (knex) => knex.schema.dropTableIfExists(tables.delivery),
};
