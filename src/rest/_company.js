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
  const response = await userService.join(ctx.request.body);
  ctx.body = response;
  ctx.status = 204;
};
join.validationScheme = {
  body: {
    email: Joi.string(),
    companyVAT: Joi.string(),
  },
};

const getAll = async (ctx) => {
  const companies = await companyService.getAll();
  ctx.body = companies;
};
getAll.validationScheme = null;

const getAllEmployees = async (ctx) => {
  const decodedAdmin = await userService.getByToken(ctx.headers.authorization);
  const admin = await userService.getUserByEmail(decodedAdmin.email);
  const employeeData = await userService.getAllEmployees(admin.companyId);
  ctx.body = employeeData;
};
getAllEmployees.validationScheme = null;

module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/company',
  });

  // router.post('/verify', validate(verify.validationScheme), verify);
  // router.post('/register', validate(register.validationScheme), authorization(permissions.loggedIn), register);
  router.post('/register', authorization(permissions.loggedIn), register);
  // router.post('/join', validate(join.validationScheme), join);
  router.put('/join', authorization(permissions.loggedIn), validate(join.validationScheme), join);
  // TODO how to get authorization right on this?
  // router.get('/', authorization(permissions.loggedIn), getAll);
  router.get('/', validate(getAll.validationScheme), getAll);
  router.get('/employees', authorization(permissions.admin), validate(getAllEmployees), getAllEmployees);
  // router.get('/employees', getAllEmployees);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};