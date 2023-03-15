// const jwt = require('jsonwebtoken');
const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
  category: {
    id: 1,
    name: 'Sport items',
    description: 'Items that have somthing to do with various outdoor sports',
    categoryImg: null,
  },
};

describe('Category', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  const url = '/api/category';
  describe("GET /api/category/", () => {
    beforeAll(async () => {
      // await knex(tables.category).delete();
      await knex(tables.category).insert(data.category);
    });

    afterAll(async () => {
      await knex(tables.category).delete();
    });

    test('It should return all Category', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(1);
      expect(response.body.categories.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /api/category/:id", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.category);
    });

    afterAll(async () => {
      await knex(tables.category).delete();
    });

    test('It should return a specific category', async () => {
      const response = await request.get(`${url}/${data.category.id}`);
      expect(response.status).toBe(200);
      expect(response.body[0].id).toBe(data.category.id);
    });
  });
});