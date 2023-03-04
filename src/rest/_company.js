const Joi = require('joi');
const Router = require('@koa/router');

const companyService = require('../service/company');
const userService = require('../service/user');
const validate = require('./_validation');

const {
  authorization,
  permissions,
} = require('../core/auth');

const register = async (ctx) => {
  console.log(ctx.request.body);
  const response = await companyService.register(ctx.request.body);
  ctx.body = response;
  ctx.status = 201;
};
register.validationScheme = {
  body: {
    name: Joi.string(),
    countryCode: Joi.string(),
    vatNumber: Joi.string(),
    street: Joi.string(),
    streetNumber: Joi.string(),
    zipCode: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
  },
};

const join = async (ctx) => {
  const response = await companyService.join(ctx.request.body);
};

const getAll = async (ctx) => {
  const companies = await companyService.getAll();
  ctx.body = companies;
};

module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/company',
  });

  // router.post('/verify', validate(verify.validationScheme), verify);
  // router.post('/register', validate(register.validationScheme), authorization(permissions.loggedIn), register);
  router.post('/register', authorization(permissions.loggedIn), register);

  // TODO how to get authorization right on this?
  // router.get('/', authorization(permissions.loggedIn), getAll);
  router.get('/', getAll);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};