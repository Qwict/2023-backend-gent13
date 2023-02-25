const Joi = require('joi');
const Router = require('@koa/router');
const productService = require('../service/product');

const getById = async (ctx) => {
  ctx.body = await productService.getById(ctx.params.id);
  ctx.status = 200;
};
/*
getById.validationScheme = {
    params: {
        id: Joi.any()
    }
};
*/

const getAll = async (ctx) => {
  ctx.body = await productService.getAll();
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/product',
  });

  router.get('/:id', getById); // nog validation toevoegen
  router.get('/', getAll); // nog validation toevoegen

  app.use(router.routes()).use(router.allowedMethods());
};
