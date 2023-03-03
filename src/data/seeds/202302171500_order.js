module.exports = {
  seed: async (knex) => {
    await knex('order').insert([
    ]);
  },
};