const Joi = require('joi');
const Router = require('@koa/router');

const packageService = require('../service/packaging');
const validate = require('./_validation');
const { authorization, permissions } = require('../core/auth');

const getById = async (ctx) => {
  ctx.body = await packageService.getById(ctx.params.id);
  ctx.status = 200;
};

getById.validationScheme = {
  params: {
    id: Joi.number().integer(),
  },
};

const getAll = async (ctx) => {
  ctx.body = await packageService.getAll();
  ctx.status = 200;
};
getAll.validationScheme = null;

module.exports = function installPackageRouter(app) {
  const router = new Router({
    prefix: '/package',
  });

  router.get('/:id', authorization(permissions.loggedIn), validate(getById.validationScheme), getById);
  router.get('/', authorization(permissions.loggedIn), validate(getAll.validationScheme), getAll);

  app.use(router.routes()).use(router.allowedMethods());
};