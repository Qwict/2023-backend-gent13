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
        zipCode: "9000",
        city: "Gent",
        country: "Belgium",
        additionalInformation: "",
        trackAndtrace: `1678526829969DCJOP`,
        deliveryStatus: 0,
      },
    ]);
  },
};