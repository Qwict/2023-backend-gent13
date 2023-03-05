const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.delivery).insert([
      {
        transporterId: 1,
        orderId: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
        packagingId: 1,
        street: "Voskenslaan",
        number: "34",
        postCode: "9000",
        country: "Belgium",
        additionalInformation: "",
        trackAndtrace: `${new Date().toString()}DCJOP`,
        deliveryStatus: 0,
      },
    ]);
  },
};