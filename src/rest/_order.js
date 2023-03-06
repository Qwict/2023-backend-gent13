const Joi = require('joi');
const Router = require('@koa/router');

const orderService = require('../service/order');
const validate = require('./_validation');

const {
  authorization,
  permissions,
} = require('../core/auth');

const getAll = async (ctx) => {
  ctx.body = await orderService.getAllFromCompany(ctx.headers.authorization);
  ctx.status = 200;
};
getAll.validationScheme = {
    params: {
        companyId: Joi.any(),
    },
};

const create = async (ctx) => {
  ctx.body = await orderService.create(ctx.headers.authorization, ctx.request.body);
  ctx.statux = 201;
};
create.validationScheme = {
  body: {
    packagingId: Joi.number().integer(),
    currencyId: Joi.string().max(10),
    netPrice: Joi.number(),
    taxPrice: Joi.number(),
    totalPrice: Joi.number(),
    products: Joi.any(),
    street: Joi.string(),
    number: Joi.string(),
    postCode: Joi.string(),
    country: Joi.string(),
    additionalInformation: Joi.string(),
  },
};

module.exports = function installOrderRouter(app) {
  const router = new Router({
    prefix: '/order',
  });
// nog validation toevoegen
  router.get('/', authorization(permissions.employee), validate(getAll.validationScheme), getAll); // nog validation toevoegen
  router.post('/', validate(create.validationScheme), create);

  app.use(router.routes()).use(router.allowedMethods());
};