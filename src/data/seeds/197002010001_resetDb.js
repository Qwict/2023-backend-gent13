const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.productPrice).delete();
    await knex(tables.productDescription).delete();
    await knex(tables.orderItem).delete();
    await knex(tables.product).delete();
    await knex(tables.category).delete();
    await knex(tables.delivery).delete();
    await knex(tables.deliveryService).delete();
    await knex(tables.notification).delete();
    await knex(tables.order).delete();
    await knex(tables.packaging).delete();
    await knex(tables.user).delete();
    await knex(tables.company).delete();
  },
};