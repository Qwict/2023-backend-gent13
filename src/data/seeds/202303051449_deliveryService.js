module.exports = {
  seed: async (knex) => {
    await knex('deliveryservice').insert([
      {
        id: 1,
        name: "PostNL",
        phoneNumber: "04054125742",
        email: "postnl@email.com",
        vatNumber: "NL820577005.B01",
        trackandtraceInfo: "",
        actief: true,
      },
    ]);
  },
};