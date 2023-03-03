module.exports = {
    seed: async (knex) => {
        await knex('customer').insert([{
            "name": "something",
            "mail": "something",
            "hash": "somethingHashed",
            "salt": "A salt",
            "companyId": "CP100110"
        }]);
    },
};