const Joi = require('joi');
const Router = require('@koa/router');

const categoryService = require('../service/category');
const validate = require('./_validation');

const getById = async (ctx) => {
  ctx.body = await categoryService.getById(ctx.params.id);
  ctx.status = 200;
};

getById.validationScheme = {
  params: {
    id: Joi.number().integer(),
  },
};

const getAll = async (ctx) => {
  ctx.body = await categoryService.getAll();
  ctx.status = 200;
};
getAll.validationScheme = null;

module.exports = function installCategoryRouter(app) {
  const router = new Router({
    prefix: '/category',
  });

  router.get('/:id', validate(getById.validationScheme), getById); // nog validation toevoegen
  router.get('/', validate(getAll.validationScheme), getAll);

  app.use(router.routes()).use(router.allowedMethods());
};