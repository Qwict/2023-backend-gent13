const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.product_price).delete();
    await knex(tables.product_description).delete();
    await knex(tables.order_item).delete();
    await knex(tables.product).delete();
    await knex(tables.category).delete();
    await knex(tables.delivery).delete();
    await knex(tables.delivery_service).delete();
    await knex(tables.notification).delete();
    await knex(tables.order).delete();
    await knex(tables.packaging).delete();
    await knex(tables.user).delete();
    await knex(tables.company).delete();
  },
};