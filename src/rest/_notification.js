const Joi = require('joi');
const Router = require('@koa/router');

const notificationService = require('../service/notification');
const validate = require('./_validation');

const getById = async (ctx) => {
  ctx.body = await notificationService.getById(ctx.params.id);
  ctx.status = 200;
};

getById.validationScheme = {
  params: {
    id: Joi.number().integer(),
  },
};

const getAll = async (ctx) => {
  ctx.body = await notificationService.getAll();
  ctx.status = 200;
};
getAll.validationScheme = null;

const createNotification = async (ctx) => {
    const newNotification = await notificationService.create({
        ...ctx.request.body,
        orderId: Number(ctx.request.body.orderId),
        companyId: Number(ctx.request.body.companyId)
    });
    ctx.body = newNotification;
    ctx.status = 201;
  };

  createNotification.validationScheme = {
    body: Joi.object({
        date: Joi.date,
        text: Joi.string,
        status: Joi.string,
        orderid: Joi.number,
        companyid: Joi.number,
    }),
  };
  const deleteNotification = async (ctx) => {
    await notificationService.deleteById(ctx.params.id);
    ctx.status = 204;
  };
  deleteNotification.validationScheme = {
    params: {
      id: Joi.number().integer().positive(),
    },
  };
module.exports = function installNotifactionRouter(app) {
  const router = new Router({
    prefix: '/notification',
  });

  router.get('/:id', validate(getById.validationScheme), getById); // nog validation toevoegen
  router.get('/', validate(getAll.validationScheme), getAll);
  router.get('/', validate(createNotification.validationScheme), createNotification);
  router.get('/:id', validate(deleteNotification.validationScheme), deleteNotification);

  app.use(router.routes()).use(router.allowedMethods());
};