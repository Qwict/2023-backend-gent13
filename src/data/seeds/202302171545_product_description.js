module.exports = {
  seed: async (knex) => {
    await knex('productdescripion').insert([
    ]);
  },
};