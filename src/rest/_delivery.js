const Joi = require('joi');
const Router = require('@koa/router');

const deliveryService = require('../service/delivery');
const validate = require('./_validation');

const {
  authorization,
  permissions,
} = require('../core/auth');

const getByTrackAndTrace = async (ctx) => {
  ctx.body = await deliveryService.getByTrackAndTrace(ctx.params);
  ctx.status = 200;
};
getByTrackAndTrace.validationScheme = {
  params: {
    trackCode: Joi.string(),
    verificationCode: Joi.string(),
  },
};

module.exports = function installDeliveryRouter(app) {
  const router = new Router({
    prefix: '/delivery',
  });
// nog validation toevoegen
  router.get('/:trackCode/verification/:verificationCode', validate(getByTrackAndTrace.validationScheme), getByTrackAndTrace);

  app.use(router.routes()).use(router.allowedMethods());
};