module.exports = {
    seed: async (knex) => {
        await knex('customer').insert([{
            "name": "something",
            "mail": "something",
            "password": "somethingHashed",
            "salt": "A salt",
            "customerId": "CP100110"
        }]);
    },
};