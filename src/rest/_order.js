const Joi = require('joi');
const Router = require('@koa/router');

const orderService = require('../service/order');
const validate = require('./_validation');

const getAll = async (ctx) => {
  ctx.body = await orderService.getAllFromCompany(ctx.params.companyId);
  ctx.status = 200;
};

getAll.validationScheme = {
    params: {
        companyId: Joi.any(),
    },
};

module.exports = function installOrderRouter(app) {
  const router = new Router({
    prefix: '/order',
  });
// nog validation toevoegen
  router.get('/:companyId', validate(getAll.validationScheme), getAll); // nog validation toevoegen

  app.use(router.routes()).use(router.allowedMethods());
};