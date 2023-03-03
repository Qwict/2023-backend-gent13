// Seed only includes first 20 objects of dataset
module.exports = {
  seed: async (knex) => {
    await knex('productprice').insert([
    ]);
  },
};