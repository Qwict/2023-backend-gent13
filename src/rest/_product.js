const Joi = require('joi');
const Router = require('@koa/router');

const productService = require('../service/product');
const validate = require('./_validation');

const getById = async (ctx) => {
  ctx.body = await productService.getById(ctx.params.id, ctx.params.languageId);
  ctx.status = 200;
};

getById.validationScheme = {
  params: {
    id: Joi.number().integer(),
    languageId: Joi.string().max(10),
  },
};

const getAll = async (ctx) => {
  ctx.body = await productService.getAll(ctx.params.languageId);
  ctx.status = 200;
};
getAll.validationScheme = {
  params: {
    languageId: Joi.string().max(10),
  },
};

const getAllByCategory = async (ctx) => {
  ctx.body = await productService.getAllByCategory(ctx.params.categoryId, ctx.params.languageId);
  ctx.status = 200;
};
getAllByCategory.validationScheme = {
  params: {
    categoryId: Joi.number().integer(),
    languageId: Joi.string().max(10),
  },
};

const updateStock = async (ctx) => {
  ctx.body = await productService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 204;
};
updateStock.validationScheme = {
  params: {
    id: Joi.number().integer(),
  },
  body: {
    amount: Joi.number(),
  },
};

module.exports = function installProductRouter(app) {
  const router = new Router({
    prefix: '/product',
  });

  router.get('/category/:categoryId/:languageId', validate(getAllByCategory.validationScheme), getAllByCategory);
  router.get('/:languageId', validate(getAll.validationScheme), getAll);
  router.get('/:id/:languageId', validate(getById.validationScheme), getById);
  router.put('/:id', validate(updateStock.validationScheme), updateStock);

  app.use(router.routes()).use(router.allowedMethods());
};