module.exports = {
  seed: async (knex) => {
    await knex('product').insert([
    ]);
  },
};