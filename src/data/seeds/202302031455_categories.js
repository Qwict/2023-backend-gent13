const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.category).insert([
      {
        id: 1,
        name: 'Sport items',
        description: 'Items that have somthing to do with various outdoor sports',
        categoryImg: null,
      },
      {
        id: 2,
        name: 'Care items',
        description: 'Various items concerning health and beauty',
        categoryImg: null,
      },
      {
        id: 3,
        name: 'Hardware',
        description: 'Various types of hardware, including servers with built in hardware',
        categoryImg: null,
      },
      {
        id: 4,
        name: 'Telephony',
        description: 'Electronics used to call / communicate / play',
        categoryImg: null,
      },
      {
        id: 5,
        name: 'Computers & Tablets',
        description: 'Electronics used to call / communicate / play',
        categoryImg: null,
      },
      {
        id: 6,
        name: 'Image & Sound',
        description: 'Electronics used to listen to music / see videos',
        categoryImg: null,
      },
    ]);
  },
};
