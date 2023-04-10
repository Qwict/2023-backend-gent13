const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.delivery_service).insert([
      {
        id: 1,
        name: "PostNL",
        phone_number: "04054125742",
        email: "postnl@email.com",
        vat_number: "NL820577005.B01",
        track_and_trace_info: "",
        active: true,
      },
    ]);
  },
};