// const jwt = require('jsonwebtoken');
const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
  product: {
    id: "AANKOOP_GEBOUW",
    syncId: 1810,
    unitOfMeasureId: "EA",
    productCategoryId: "1.6.3",
    productAvailability: "STOCK",
    },
};

const dataToDelete = {
  product: "AANKOOP_GEBOUW",
};

describe('Products', () => {
  let request;
  let knex;

  withServer(({
    knex: k,
    request: r,
  }) => {
    knex = k;
    request = r;
  });

  const url = '/api/product';
  describe("GET /api/product/", () => {
    beforeAll(async () => {
      await knex(tables.product).delete();
      await knex(tables.product).insert(data.product);
    });

    afterAll(async () => {
      await knex(tables.product)
        .where('id', dataToDelete.product)
        .delete();
    });

    test('It should return all products', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.products).toContainEqual(data.product);
    });
  });

  describe("GET /api/product/:id", () => {
    beforeAll(async () => {
      await knex(tables.product).delete();
      await knex(tables.product).insert(data.product);
    });

    afterAll(async () => {
      await knex(tables.product)
        .where('id', dataToDelete.product)
        .delete();
    });

    test('It should return a specific product', async () => {
      const response = await request.get(`${url}/${data.product.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.product);
    });
  });
});