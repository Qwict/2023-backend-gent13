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
    product: {
      id: 1,
      stock: 500,
      image: null,
      companyId: 1,
      },
    productDescription: {
      id: 1,
      productId: 1,
      languageId: 'nl',
      name: 'Ski-lat',
      shortDescription: 'oi',
      longDescription: 'oioi',
      },
    productPrice: {
      id: 1,
      productId: 1,
      price: 49.99,
      quantity: 1,
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
  orderItem: {
    id: 2,
    orderId: "12165d36-cb10-4e12-8d6b-10cdf8f5f9f1",
    productId: 1,
    quantity: 1,
    netPrice: 49.99,
  },
  deliveryService: {
    id: 1,
    name: "PostNL",
    phoneNumber: "04054125742",
    email: "postnl@email.com",
    vatNumber: "NL820577005.B01",
    trackandtraceInfo: "",
    actief: true,
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

describe('Order', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  const baserUrl = '/api/order';

  describe('GET /orders', () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
      await knex(tables.packaging).insert(data.packaging);
      await knex(tables.user).insert(data.user);
      await knex(tables.product).insert(data.product);
      await knex(tables.productDescription).insert(data.productDescription);
      await knex(tables.productPrice).insert(data.productPrice);
      await knex(tables.orders).insert(data.order);
      await knex(tables.orderItem).insert(data.orderItem);
      await knex(tables.deliveryService).insert(data.deliveryService);
      await knex(tables.delivery).insert(data.delivery);
    });

    afterAll(async () => {
      await knex(tables.delivery).delete();
      await knex(tables.deliveryService).delete();
      await knex(tables.orderItem).delete();
      await knex(tables.orders).delete();
      await knex(tables.productPrice).delete();
      await knex(tables.productDescription).delete();
      await knex(tables.product).delete();
      await knex(tables.user).delete();
      await knex(tables.packaging).delete();
      await knex(tables.company).delete();
    });

    it('should return all orders', async () => {
      const token = jwt.sign({
        name: data.user.name,
        email: data.user.email,
        permission: data.user.role,
        }, process.env.JWT_SECRET, {
        expiresIn: 36000,
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      });
      const response = await request.get(baserUrl).set('Authorization', `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /orders/:id', () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
      await knex(tables.packaging).insert(data.packaging);
      await knex(tables.user).insert(data.user);
      await knex(tables.product).insert(data.product);
      await knex(tables.productDescription).insert(data.productDescription);
      await knex(tables.productPrice).insert(data.productPrice);
      await knex(tables.orders).insert(data.order);
      await knex(tables.orderItem).insert(data.orderItem);
      await knex(tables.deliveryService).insert(data.deliveryService);
      await knex(tables.delivery).insert(data.delivery);
    });

    afterAll(async () => {
      await knex(tables.delivery).delete();
      await knex(tables.deliveryService).delete();
      await knex(tables.orderItem).delete();
      await knex(tables.orders).delete();
      await knex(tables.productPrice).delete();
      await knex(tables.productDescription).delete();
      await knex(tables.product).delete();
      await knex(tables.user).delete();
      await knex(tables.packaging).delete();
      await knex(tables.company).delete();
    });

    it('should return a order', async () => {
      const token = jwt.sign({
        name: data.user.name,
        email: data.user.email,
        permission: data.user.role,
        }, process.env.JWT_SECRET, {
        expiresIn: 36000,
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      });
      const response = await request.get(`${baserUrl}/${data.order.id}`).set('Authorization', `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.orderId).toBe(data.order.id);
    });
  });
});