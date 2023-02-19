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
  } catch {
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

const verify = async (ctx) => {
  console.log("REST")
  console.log(ctx.request.body)
  try {
    const verification = await userService.verify(ctx.request.body);
    console.log(verification);
    ctx.body = verification;
    ctx.status = 202;
  } catch {
    ctx.status = 500
  }
}

verify.validationScheme = {
  body: {
    email: Joi.string(),
    password: Joi.string()
  }
}


module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/verify', validate(verify.validationScheme), verify);
  router.get('/:id', getById);
  router.post('/register', validate(register.validationScheme), register);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}