const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.packaging).insert([
      {
        id: 1,
        name: "Extra special packaging",
        type: "custom",
        width: 10,
        height: 10,
        length: 10,
        price: 50,
        active: true,
      },
      {
        id: 2,
        name: "normal packaging",
        type: "standard",
        width: 10,
        height: 10,
        length: 10,
        price: 25,
        active: true,
      },
    ]);
  },
};