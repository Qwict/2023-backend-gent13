const jwt = require('jsonwebtoken');
const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
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
  notification: {
    id: '0ebc10c4-a784-4b5a-8efd-b549089f02d6',
    orderId: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
    userId: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
    companyId: 1,
    date: 'Sat Mar 04 2023 12:09:30 GMT+0100 (Central European Standard Time)',
    subject: 'Order information',
    audience: 'company',
    text: 'Order by Joris, this notification should be visible for all employees and admins in a company',
    status: false,
    archived: false,
  },
};

describe('Notification', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  const url = '/api/notifications';
  describe("GET /api/notifications/", () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
      await knex(tables.packaging).insert(data.packaging);
      await knex(tables.user).insert(data.user);
      await knex(tables.orders).insert(data.order);
      await knex(tables.notification).insert(data.notification);
    });

    afterAll(async () => {
      await knex(tables.notification).delete();
      await knex(tables.orders).delete();
      await knex(tables.user).delete();
      await knex(tables.packaging).delete();
      await knex(tables.company).delete();
    });

    test('It should return all Notifications', async () => {
      const token = jwt.sign({
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        companyId: data.user.companyId,
      }, process.env.JWT_SECRET, {
        expiresIn: 36000,
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      });
      const response = await request.get(url).set('Authorization', `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(1);
      expect(response.body.items.length).toBeGreaterThanOrEqual(1);
    });
  });

  // describe("GET /api/notifications/:id", () => {
  //   beforeAll(async () => {
  //     await knex(tables.company).insert(data.company);
  //     await knex(tables.packaging).insert(data.packaging);
  //     await knex(tables.user).insert(data.user);
  //     await knex(tables.orders).insert(data.order);
  //     await knex(tables.notification).insert(data.notification);
  //   });

  //   afterAll(async () => {
  //     await knex(tables.notification).delete();
  //     await knex(tables.orders).delete();
  //     await knex(tables.user).delete();
  //     await knex(tables.packaging).delete();
  //     await knex(tables.company).delete();
  //   });

  //   test('It should return a specific notification', async () => {
  //     const token = jwt.sign({
  //       id: data.user.id,
  //       email: data.user.email,
  //       role: data.user.role,
  //       companyId: data.user.companyId,
  //     }, process.env.JWT_SECRET, {
  //       expiresIn: 36000,
  //       issuer: process.env.AUTH_ISSUER,
  //       audience: process.env.AUTH_AUDIENCE,
  //     });
  //     const response = await request.get(`${url}/${data.notification.id}`).set('Authorization', `${token}`);
  //     expect(response.status).toBe(200);
  //     expect(response.body.id).toBe(data.notification.id);
  //   });
  // });
});