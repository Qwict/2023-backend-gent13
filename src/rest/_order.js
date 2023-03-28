const Joi = require('joi');
const Router = require('@koa/router');

const orderService = require('../service/order');
const validate = require('./_validation');

const {
  authorization,
  permissions,
} = require('../core/auth');

const getById = async (ctx) => {
  ctx.body = await orderService.getById(ctx.params.id);
  ctx.status = 200;
};
getById.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

const getAll = async (ctx) => {
  const orders = await orderService.getAll(ctx.headers.authorization);
  ctx.body = orders;
  ctx.status = 200;
};
getAll.validationScheme = null;

const create = async (ctx) => {
  ctx.body = await orderService.create(ctx.headers.authorization, ctx.request.body);
  ctx.statux = 201;
};
create.validationScheme = {
  body: {
    packagingId: Joi.number().integer(),
    netPrice: Joi.number(),
    taxPrice: Joi.number(),
    totalPrice: Joi.number(),
    products: Joi.any(),
    street: Joi.string(),
    number: Joi.string(),
    zipCode: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    additionalInformation: Joi.any(),
  },
};

const updateById = async (ctx) => {
  ctx.body = await orderService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 204;
};
updateById.validationScheme = {
  params: {
    id: Joi.any(),
  },
  body: {
    packagingId: Joi.any(),
    street: Joi.string(),
    number: Joi.string(),
    zipCode: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
  },
};

module.exports = function installOrderRouter(app) {
  const router = new Router({
    prefix: '/order',
  });
// nog validation toevoegen
  router.get('/', authorization(permissions.loggedIn), validate(getAll.validationScheme), getAll); // nog validation toevoegen
  router.get('/:id', authorization(permissions.loggedIn), validate(getById.validationScheme), getById);
  router.post('/', authorization(permissions.loggedIn), validate(create.validationScheme), create);
  router.put('/:id', authorization(permissions.loggedIn), validate(updateById.validationScheme), updateById);

  app.use(router.routes()).use(router.allowedMethods());
};