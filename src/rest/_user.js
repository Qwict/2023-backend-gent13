const Joi = require('joi');
const Router = require('@koa/router');

const userService = require('../service/user');
const jwt = require("jsonwebtoken");

const validate = require('./_validation');

const getById = async (ctx) => {
  try {
    var token = ctx.headers.authorization;
    const decoded = jwt.verify(token, 'supersecret');
    ctx.body = await userService.getById(ctx.params.id);
    ctx.status = 200;
  } catch (error) {
    ctx.body = 'UNAUTHORIZED';
    ctx.status = 403;
  }
};

const register = async (ctx) => {
  console.log(ctx.request.body)
  try {
    const token = await userService.register(ctx.request.body);
    ctx.body = token;
    ctx.status = 201;
  } catch(err) {
    ctx.status = 500
  }
}

register.validationScheme = {
  body: {
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
  }
}

const login = async (ctx) => {
  try {
    const verification = await userService.login(ctx.request.body);
    ctx.body = verification;
    ctx.status = 202;
  } catch(err) {
    ctx.status = 500;
  }
}

login.validationScheme = {
  body: {
    email: Joi.string(),
    password: Joi.string()
  }
}

const verify = async(ctx) => {
  const bool = await userService.verify(ctx.request.body);
  ctx.body = bool;
  ctx.status = 203;
}
verify.validationScheme = {
  body: {
    data: Joi.string(),
  }
}


module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/login', validate(login.validationScheme), login);
  router.post('/verify',validate(verify.validationScheme), verify)
  router.get('/:id', getById);
  router.post('/register', validate(register.validationScheme), register);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}