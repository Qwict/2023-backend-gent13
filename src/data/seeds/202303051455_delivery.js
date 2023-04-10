const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.delivery).insert([
      {
        transporter_id: 1,
        order_id: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
        packaging_id: 1,
        street: "Voskenslaan",
        number: "34",
        zip_code: "9000",
        city: "Gent",
        country: "Belgium",
        additional_information: "",
        track_and_trace: `1678526829969DCJOP`,
        delivery_status: 0,
      },
    ]);
  },
};