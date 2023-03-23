const jwt = require('jsonwebtoken');
const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
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
};

describe('Packaging', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  const url = '/api/package';
  describe("GET /api/packaging/", () => {
    beforeAll(async () => {
      await knex(tables.packaging).insert(data.packaging);
    });

    afterAll(async () => {
      await knex(tables.packaging).delete();
    });

    test('It should return all Packaging', async () => {
      const token = jwt.sign({
        id: data.user.id,
        role: data.user.role,
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

  describe("GET /api/packaging/:id", () => {
    beforeAll(async () => {
      await knex(tables.packaging).insert(data.packaging);
    });

    afterAll(async () => {
      await knex(tables.packaging).delete();
    });

    test('It should return a specific packaging', async () => {
      const token = jwt.sign({
        id: data.user.id,
        role: data.user.role,
      }, process.env.JWT_SECRET, {
        expiresIn: 36000,
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      });
      const response = await request.get(`${url}/${data.packaging.id}`).set('Authorization', `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(data.packaging.id);
    });
  });
});