const Joi = require('joi');
const Router = require('@koa/router');

const companyService = require('../service/company');
const userService = require('../service/user');
const validate = require('./_validation');

const upload = require('../core/upload');

const {
  authorization,
  permissions,
} = require('../core/auth');

const register = async (ctx) => {
  const newAdminToken = ctx.headers.authorization;
  const company = ctx.request.body;
  const response = await companyService.register(company, newAdminToken);
  ctx.body = response;
  ctx.status = 201;
};
register.validationScheme = {
  body: {
    name: Joi.string(),
    countryCode: Joi.string().allow(''),
    vatNumber: Joi.string().allow(''),
    street: Joi.string().allow(''),
    streetNumber: Joi.string().allow(''),
    zipCode: Joi.string().allow(''),
    city: Joi.string().allow(''),
    country: Joi.string().allow(''),
  },
};

const join = async (ctx) => {
  const { companyId } = ctx.request.body;
  const token = ctx.request.headers.authorization;
  const response = await userService.join({ token, companyId });
  ctx.body = response;
  ctx.status = 204;
};
join.validationScheme = {
  body: {
    companyId: Joi.number(),
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

const getCompanyByVAT = async (ctx) => {
  const companyVAT = ctx.params.id;
  const company = await companyService.getCompanyByVAT(companyVAT);
  ctx.body = company;
  ctx.status = 200;
};
getCompanyByVAT.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

const addLogo = async (ctx) => {
  console.log(ctx.file);
  const file = ctx.file.filename;
  console.log(file);
  ctx.status = 201;
};

module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/company',
  });

  // router.post('/verify', validate(verify.validationScheme), verify);
  router.post('/', authorization(permissions.loggedIn), register);
  // router.post('/', authorization(permissions.loggedIn), validate(register.validationScheme), register);
  // router.post('/join', validate(join.validationScheme), join);
  router.put('/join', authorization(permissions.loggedIn), validate(join.validationScheme), join);
  // TODO how to get authorization right on this?
  // router.get('/', authorization(permissions.loggedIn), getAll);
  router.get('/', validate(getAll.validationScheme), getAll);
  router.get('/employee', authorization(permissions.admin), validate(getAllEmployees), getAllEmployees);
  router.get('/vat/:id', authorization(permissions.loggedIn), validate(getCompanyByVAT), getCompanyByVAT);
  router.post('/logo', upload.single('image'), addLogo);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};