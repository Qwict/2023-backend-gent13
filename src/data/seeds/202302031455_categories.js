module.exports = {
  seed: async (knex) => {
    await knex('category').insert([
      {
        id: 1,
        name: 'Sport items',
        description: 'Items that have somthing to do with various outdoor sports',
        categoryImg: null,
      },
      {
        id: 2,
        name: 'Care items',
        description: "Various items concerning health and beauty",
        categoryImg: null,
      },
      {
        id: 3,
        name: 'Hardware',
        description: "Various types of hardware, including servers with built in hardware",
        categoryImg: null,
      },
    ]);
  },
};