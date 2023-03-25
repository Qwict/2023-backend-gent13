const Joi = require('joi');
const Router = require('@koa/router');

const productService = require('../service/product');
const validate = require('./_validation');

const getById = async (ctx) => {
  ctx.body = await productService.getById(ctx.params.id);
  ctx.status = 200;
};

getById.validationScheme = {
  params: {
    id: Joi.number().integer(),
  },
};

const getAll = async (ctx) => {
  ctx.body = await productService.getAll();
  ctx.status = 200;
};
getAll.validationScheme = null;

const getAllByCategory = async (ctx) => {
  ctx.body = await productService.getAllByCategory();
  ctx.status = 200;
};
getAllByCategory.validationScheme = null;

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

  router.get('/category', validate(getAllByCategory.validationScheme), getAllByCategory);
  router.get('/:id', validate(getById.validationScheme), getById);
  router.get('/', validate(getAll.validationScheme), getAll);
  router.put('/:id', validate(updateStock.validationScheme), updateStock);

  app.use(router.routes()).use(router.allowedMethods());
};