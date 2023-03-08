const Joi = require('joi');
const Router = require('@koa/router');

const userService = require('../service/user');
const validate = require('./_validation');

const {
  authorization,
  permissions,
} = require('../core/auth');

const getByToken = async (ctx) => {
  ctx.body = await userService.getByToken(ctx.headers.authorization);
  ctx.status = 200;
};
getByToken.validationScheme = null;

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

const update = async (ctx) => {
  const token = ctx.headers.authorization;
  const verification = await userService.update(token, ctx.request.body);
  ctx.body = verification;
  ctx.status = 201;
};
update.validationScheme = {
  body: {
    name: Joi.string().allow(''),
    email: Joi.string().allow(''),
    firstName: Joi.string().allow(''),
    lastName: Joi.string().allow(''),
  },
};

const getUser = async (ctx) => {
  const user = await userService.getUser(ctx.headers.authorization);
  ctx.body = user;
  ctx.status = 200;
};

module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/login', validate(login.validationScheme), login);
  router.post('/verify', validate(verify.validationScheme), verify);
  router.get('/', validate(getUser.validationScheme), authorization(permissions.loggedIn), getUser);
  router.post('/update', authorization(permissions.loggedIn), update);
  // router.put('/update', validate(getByToken.validationScheme), authorization(permissions.loggedIn), update);
  router.post('/register', validate(register.validationScheme), register);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};