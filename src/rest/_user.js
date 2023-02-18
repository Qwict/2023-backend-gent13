const Joi = require('joi');
const Router = require('@koa/router');

const userService = require('../service/user');
const jwt = require("jsonwebtoken");

const validate = require('./_validation');

const getById = async (ctx) => {
  var token = ctx.headers.authorization;
  console.log('METHOD');
  console.log(token);
  const decoded = jwt.verify(token, 'supersecret');
  if (decoded) {
    ctx.body = await userService.getById(ctx.params.id);
    ctx.status = 200;
  } else{
    ctx.status = 401;
  }
  

};

const register = async (ctx) => {
  await userService.register(ctx.request.body);
  ctx.status = 201;
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
  const verification = await userService.verify(ctx.request.body);
  console.log(verification);
  ctx.body = verification;
  ctx.status = 202;
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


  router.get('/verify', validate(verify.validationScheme), verify);
  router.get('/',getById);
  router.post('/register', validate(register.validationScheme), register);

  app
  .use(router.routes())
  .use(router.allowedMethods());
}