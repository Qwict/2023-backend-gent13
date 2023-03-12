// const jwt = require('jsonwebtoken');
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
  category: {
    id: 1,
    name: 'Sport items',
    description: 'Items that have somthing to do with various outdoor sports',
    categoryImg: null,
  },
  product: {
    id: 1,
    productCategoryId: 1,
    stock: 500,
    image: null,
    companyId: 1,
    },
  productDescription: {
    productId: 1,
    languageId: 'nl',
    name: 'Ski-lat',
    shortDescription: 'oi',
    longDescription: 'oioi',
    },
  productPrice: {
    productId: 1,
    currencyId: 'EUR',
    price: 49.99,
    quantity: 1,
  },
};

const dataToDelete = {
  category: 1,
  product: 1,
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
      // await knex(tables.product).delete();
      await knex(tables.company).insert(data.company);
      await knex(tables.category).insert(data.category);
      await knex(tables.product).insert(data.product);
      await knex(tables.productDescription).insert(data.productDescription);
      await knex(tables.productPrice).insert(data.productPrice);
    });

    afterAll(async () => {
      await knex(tables.productPrice).delete();
      await knex(tables.productDescription).delete();
      await knex(tables.product)
        .where('id', dataToDelete.product)
        .delete();
      await knex(tables.category).delete();
      await knex(tables.company).delete();
    });

    test('It should return all products', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(1);
      expect(response.body.products.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("GET /api/product/:id", () => {
    beforeAll(async () => {
      await knex(tables.company).insert(data.company);
      await knex(tables.category).insert(data.category);
      await knex(tables.product).insert(data.product);
      await knex(tables.productDescription).insert(data.productDescription);
      await knex(tables.productPrice).insert(data.productPrice);
    });

    afterAll(async () => {
      await knex(tables.product)
        .where('id', dataToDelete.product)
        .delete();
      await knex(tables.category).delete();
      await knex(tables.company).delete();
    });

    test('It should return a specific product', async () => {
      const response = await request.get(`${url}/${data.product.id}`);
      expect(response.status).toBe(200);
      expect(response.body[0].id).toBe(data.product.id);
    });
  });
});