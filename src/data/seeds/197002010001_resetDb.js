module.exports = {
  seed: async (knex) => {
    await knex('company').delete();
    await knex('user').delete();
  },
};