module.exports = {
  seed: async (knex) => {
    await knex('productmeasurement').insert([
    ]);
  },
};