const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
  deliveryService: {
    id: 1,
    name: "PostNL",
    phoneNumber: "04054125742",
    email: "postnl@email.com",
    vatNumber: "NL820577005.B01",
    trackandtraceInfo: "",
    actief: true,
  },
  company: {
    id: 1,
    name: 'BVBA MILJAAR',
    logoImg: null,
    countryCode: "BE",
    vatNumber: "0684579082",
    street: "Bekkemmeers",
    streetNumber: "26",
    zipCode: "8740",
    city: "Pittem",
    country: "Belgium",
  },
  packaging: {
    id: 1,
    name: "Extra special packaging",
    type: "custom",
    width: 10,
    height: 10,
    length: 10,
    price: 50,
    active: true,
  },
  user: {
    id: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
    name: 'joris',
    firstName: 'Joris',
    lastName: 'Van Duyse',
    street: "Voskenslaan",
    streetNumber: "34",
    zipCode: "9000",
    city: "Gent",
    country: "Belgium",
    email: 'test@gmail.com',
    salt: 'EmdaG/Ks3SRf1kKVzabARJwNqRLnXlpCN60kCmLX5tt2faDlaXrkE1BI1R8mFKMo/Sj6VOjeZEvCb/CaPLw68bUs6p9qpPhSYT1DJVoYyWoovbN4VTTVwE6lsqy40/XHpECzr9wjpfdYAs/770EBzzou/e1rue/7VoZhJau0UFI=',
    hash: 'hQXWdE01+n+yibcH1LqjpuMUhcufBMBT2NkNmuV6x7DoeSPbFRvM3laXdIfnqyOi9rknLoBeok5m6y+4yHbsQQ==',
    companyId: 1,

    role: 'employee',
  },
  order: {
    id: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
    buyerId: "4b09960e-0864-45e0-bab6-6cf8c7fc4626",
    customerId: 1,
    fromCompanyId: 1,
    packagingId: 1,
    orderReference: "REF1",
    orderDateTime: "Fri Mar 03 2023 15:34:55 GMT+0100 (Central European Standard Time)",
    netPrice: 49.99,
    taxPrice: 0,
    totalPrice: 49.99,
    orderStatus: 0,
  },
  delivery: {
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
};

describe('Delivery', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  describe("GET /api/delivery/:track/verification/:verificationCode", () => {
    beforeAll(async () => {
      await knex(tables.deliveryService).insert(data.deliveryService);
      await knex(tables.company).insert(data.company);
      await knex(tables.packaging).insert(data.packaging);
      await knex(tables.user).insert(data.user);
      await knex(tables.orders).insert(data.order);
      await knex(tables.delivery).insert(data.delivery);
    });

    afterAll(async () => {
      await knex(tables.delivery).delete();
      await knex(tables.orders).delete();
      await knex(tables.user).delete();
      await knex(tables.packaging).delete();
      await knex(tables.company).delete();
      await knex(tables.deliveryService).delete();
    });

    test('It should return a specific delivery', async () => {
      const response = await request.get(`/api/delivery/${data.delivery.trackAndtrace}/verification/${data.order.orderReference}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});