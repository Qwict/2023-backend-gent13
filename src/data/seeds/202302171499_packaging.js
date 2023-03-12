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
      {
        id: 3,
        name: "large packaging",
        type: "standard",
        width: 100,
        height: 100,
        length: 100,
        price: 250,
        active: false,
      },
      {
        id: 4,
        name: "Super Special Ultra Deluxe Packaging",
        type: "standard",
        width: 69,
        height: 69,
        length: 69,
        price: 100000,
        active: false,
      },
    ]);
  },
};