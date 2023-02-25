const Joi = require('joi');
const Router = require('@koa/router');

const userService = require('../service/user');
const validate = require('./_validation');

const {
  authorization,
  permissions,
} = require('../core/auth');

const getById = async (ctx) => {
  ctx.body = await userService.getById(ctx.params.id);
  ctx.status = 200;
};
getById.validationScheme = {
  params: {
    id: Joi.any(),
  },
};

const register = async (ctx) => {
  const token = await userService.register(ctx.request.body);
  ctx.body = token;
  ctx.status = 201;
};

register.validationScheme = {
  body: {
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
  },
};

const login = async (ctx) => {
  const verification = await userService.login(ctx.request.body);
  ctx.body = verification;
  if (verification.validated) {
    ctx.status = 201;
  } else {
    ctx.status = 401;
  }
};

login.validationScheme = {
  body: {
    email: Joi.string(),
    password: Joi.string(),
  },
};

const verify = async (ctx) => {
  const bool = await userService.verify(ctx.request.body);
  ctx.body = bool;
  ctx.status = 201;
};
verify.validationScheme = {
  body: {
    token: Joi.string(),
  },
};

module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/login', validate(login.validationScheme), login);
  router.post('/verify', validate(verify.validationScheme), verify);
  router.get('/:id', validate(getById.validationScheme), authorization(permissions.loggedIn), getById);
  router.post('/register', validate(register.validationScheme), register);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};