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
    name: Joi.string().allow(null),
    email: Joi.string().allow(null),
    firstName: Joi.string().allow(null),
    lastName: Joi.string().allow(null),
    street: Joi.string().allow(null),
    streetNumber: Joi.string().allow(null),
    zipCode: Joi.string().allow(null),
    city: Joi.string().allow(null),
    country: Joi.string().allow(null),
  },
};

const getUser = async (ctx) => {
  const user = await userService.getUser(ctx.headers.authorization);
  ctx.body = user;
  ctx.status = 200;
};

const deleteUser = async (ctx) => {
  try {
    await userService.deleteUser(ctx.headers.authorization);
    ctx.status = 204;
  } catch (ServiceError) {
    ctx.status = 400;
  }
};

const promote = async (ctx) => {
  const { email, role } = ctx.request.body;
  // try {
  const token = ctx.headers.authorization;
  const promoted = await userService.promote({ token, email, role });
  ctx.status = 204;
  // } catch (ServiceError) {
  //   ctx.throw(400, 'Unable to find user with given email', {
  //     code: 'BAD_REQUEST',
  //     details: ServiceError,
  //   })
  // }
};
promote.validationScheme = {
  body: {
    email: Joi.string(),
    role: Joi.string(),
  },
};

const leaveCompany = async (ctx) => {
  const token = ctx.headers.authorization;
  await userService.leaveCompany(token);
  ctx.status = 200;
};
leaveCompany.validationScheme = null;

module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/login', validate(login.validationScheme), login);
  router.post('/verify', validate(verify.validationScheme), verify);

  router.get('/', authorization(permissions.loggedIn), getUser);
  router.delete('/', authorization(permissions.loggedIn), deleteUser);

  router.post('/update', authorization(permissions.loggedIn), update);
  // TODO can't get this validation scheme to work
  // router.post('/update', validate(getByToken.validationScheme), authorization(permissions.loggedIn), update);

  router.post('/register', validate(register.validationScheme), register);
  router.put('/promote', authorization(permissions.admin), validate(promote.validationScheme), promote);
  router.put('/leave', validate(leaveCompany.validationScheme), authorization(permissions.loggedIn), leaveCompany);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};