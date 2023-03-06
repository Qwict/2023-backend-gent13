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
    id: Joi.string(),
  },
};

const getByCategoryId = async (ctx) => {
  ctx.body = await productService.getByCategoryId(ctx.params.id);
  ctx.status = 200;
};
getByCategoryId.validationScheme = null;

const getAll = async (ctx) => {
  ctx.body = await productService.getAll();
  ctx.status = 200;
};
getAll.validationScheme = null;

module.exports = function installProductRouter(app) {
  const router = new Router({
    prefix: '/product',
  });

  router.get('/:id', validate(getById.validationScheme), getById); // nog validation toevoegen
  router.get('/category/:id', getByCategoryId); // nog validation toevoegen
  router.get('/', validate(getAll.validationScheme), getAll);

  app.use(router.routes()).use(router.allowedMethods());
};
