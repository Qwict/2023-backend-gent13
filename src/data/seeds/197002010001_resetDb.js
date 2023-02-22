module.exports = {
    seed: async (knex) => {
        await knex('user').delete();
    },
}