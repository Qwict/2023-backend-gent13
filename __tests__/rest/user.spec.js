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
    id: '2b93f1c4-38bd-490d-a0ca-f7b81b9de171',
    name: 'qwertic',
    firstName: 'Joris',
    lastName: 'Van Duyse',
    street: "Voskenslaan",
    streetNumber: "34",
    zipCode: "9000",
    city: "Gent",
    country: "Belgium",
    email: 'qwertic@qwict.com',
    salt: '9E0GXD66M8RELO3TmF5u4fwH00m6d/lgr/uwtOAn2ZZOH2GkCcCTGAqOBX/lBbQyURzzXX62su3mDv/AIVq2HH6x2anecMeV74TAgTeugqG3vclg06ihthA0JpRX+TSxTbNqeHiSrEzQjRdi3ffExXO3Ctt7xZm6dMy8BinXBZo=',
    hash: 'YKFJWMM9fJRy3+3ki/rOGfO1dFTIfOoRNZ1KHow3jSpGoUcPXwIuOmcootFFp8k4Xpgy4gxR/9sn2+l8ejFZNQ==',
    companyId: 1,

    role: 'admin',
  },
};

const dataToDelete = {
  company: 1,
  user: '2b93f1c4-38bd-490d-a0ca-f7b81b9de171',
};

describe('Users', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  const url = '/api/user';
  describe('GET /api/user/:id', () => {
    beforeAll(async () => {
      // await knex(tables.user).delete();
      await knex(tables.company).insert(data.company);
      await knex(tables.user).insert(data.user);
    });

    afterAll(async () => {
      await knex(tables.user)
        .where('id', dataToDelete.user)
        .delete();
      await knex(tables.company).where('id', dataToDelete.company).delete();
    });

    test('it should 200 and return the requested user', async () => {
      const token = jwt.sign(data.user, process.env.JWT_SECRET, {
        expiresIn: 36000,
        audience: process.env.AUTH_AUDIENCE,
        issuer: process.env.AUTH_ISSUER,
      });
      const response = await request.get(`${url}`).set('Authorization', token);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('email', data.user.email);
    });
  });

  describe('POST /api/user/register', () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
    });

    afterAll(async () => {
      await knex(tables.user).delete();
      await knex(tables.company).delete();
    });

    test('It should 201, create a new user and return a token', async () => {
      const response = await request.post(`${url}/register`).send({
        name: data.user.name,
        email: data.user.email,
        password: 'password',
      });

      expect(response.status).toBe(201);
      expect(response.body).toBeTruthy();
    });
  });

  describe('POST /api/user/login', () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
      await knex(tables.user).insert(data.user);
    });

    afterAll(async () => {
      await knex(tables.user)
        .where('id', dataToDelete.user)
        .delete();
      await knex(tables.company).where('id', dataToDelete.company).delete();
    });

    test('It should 201 and return a token', async () => {
      const response = await request.post(`${url}/login`).send({
        email: data.user.email,
        password: data.user.email,
      });

      expect(response.status).toBe(201);
      expect(response.body.token).toBeTruthy();
      expect(response.body.validated).toBe(true);
    });
  });

  describe('POST /api/user/verify', () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
      await knex(tables.user).insert(data.user);
    });

    afterAll(async () => {
      await knex(tables.user)
        .where('id', dataToDelete.user)
        .delete();
      await knex(tables.company).where('id', dataToDelete.company).delete();
    });

    test('It should 201 and return true', async () => {
      const token = jwt.sign(data.user, process.env.JWT_SECRET, {
        expiresIn: 36000,
        audience: process.env.AUTH_AUDIENCE,
        issuer: process.env.AUTH_ISSUER,
      });

      const response = await request.post(`${url}/verify`).send({
        token,
      });
      expect(response.status).toBe(201);
      expect(response.body.validated).toBe(true);
    });
  });
});