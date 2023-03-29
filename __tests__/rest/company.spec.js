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

describe('Company', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  describe('GET /company', () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
    });

    afterAll(async () => {
      await knex(tables.company).delete();
    });

    it('should return the company', async () => {
      const response = await request.get('/api/company');
      expect(response.status).toBe(200);
      expect(response.body.data[0].id).toBe(1);
    });
  });

  describe('GET /company/vat/:id', () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
    });

    afterAll(async () => {
      await knex(tables.company).delete();
    });

    it('should return the company', async () => {
      const token = jwt.sign({
        id: data.user.id,
        permission: data.user.role,
        email: data.user.email,
        companyId: data.user.companyId,
      }, process.env.JWT_SECRET, {
        expiresIn: 36000,
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      });
      const response = await request.get(`/api/company/vat/${data.company.countryCode}${data.company.vatNumber}`).set('Authorization', `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.vatNumber).toBe(data.company.vatNumber);
    });
  });
});