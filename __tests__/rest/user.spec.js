const jwt = require('jsonwebtoken');
const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
  user: {
    id: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
    name: 'joris',
    email: 'test@gmail.com',
    salt: 'D4skUAZuGs3w5uJGJb+nOBUQNrPaXkzkNY6K/sMNZu8/KKl2+yhSrxjFnMMe2pdrFAqm9iOFNBiiilFBInjPssBq/WSMc76yKNLJSiTTkk8DV9tQuKg3LVVlEGrTjcx9UiKMh/3tjOBvkdNE1M/7fz/2nh70nl3WAqod226eccQ=',
    hash: 'LKv3O/M6q5qdkyfgzpdJCStanWC4AZLGdVeC+g0ZEye8FAsA/gubfV3Nl29GaYXfSrrPnhg+6+joU69OBDoB2Q==',
  },
};

const dataToDelete = {
  user: '4b09960e-0864-45e0-bab6-6cf8c7fc4626',
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
      await knex(tables.user).delete();
      await knex(tables.user).insert(data.user);
    });

    afterAll(async () => {
      await knex(tables.user)
        .where('id', dataToDelete.user)
        .delete();
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
    afterAll(async () => {
      await knex(tables.user).delete();
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
      await knex(tables.user).insert(data.user);
    });

    afterAll(async () => {
      await knex(tables.user)
        .where('id', dataToDelete.user)
        .delete();
    });

    test('It should 201 and return a token', async () => {
      const response = await request.post(`${url}/login`).send({
        email: data.user.email,
        password: 'WayTooStrong',
      });

      expect(response.status).toBe(201);
      expect(response.body.token).toBeTruthy();
      expect(response.body.validated).toBe(true);
    });
  });

  describe('POST /api/user/verify', () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
    });

    afterAll(async () => {
      await knex(tables.user)
        .where('id', dataToDelete.user)
        .delete();
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
      expect(response.body).toBe(true);
    });
  });
});