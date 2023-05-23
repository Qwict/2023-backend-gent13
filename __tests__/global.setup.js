const config = require('config');

const { initializeData, getKnex, tables } = require('../src/data');
const { initializeLogger } = require('../src/core/logging');

module.exports = async () => {
  // Initialize the logger (required when initializing the data layer)
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });

  // Create a database connection (needed to insert test data or cleanup after tests)
  await initializeData();

  const knex = getKnex();

  await knex(tables.productPrice).delete();
  await knex(tables.productDescription).delete();
  await knex(tables.orderItem).delete();
  await knex(tables.product).delete();
  await knex(tables.category).delete();
  await knex(tables.delivery).delete();
  await knex(tables.deliveryService).delete();
  await knex(tables.notification).delete();
  await knex(tables.orders).delete();
  await knex(tables.packaging).delete();
  await knex(tables.user).delete();
  await knex(tables.company).delete();
};