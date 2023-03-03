module.exports = {
  seed: async (knex) => {
    await knex('orderitem').insert([
    ]);
  },
};