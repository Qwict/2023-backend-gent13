const Joi = require('joi');
const Router = require('@koa/router');

const notificationService = require('../service/notification');
const validate = require('./_validation');
const { authorization, permissions } = require('../core/auth');

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
  ctx.body = await notificationService.getAll(ctx.headers.authorization);
  ctx.status = 200;
};
getAll.validationScheme = null;

const createNotification = async (ctx) => {
  const newNotification = await notificationService.create(ctx.request.body);
  ctx.body = newNotification;
  ctx.status = 201;
};

createNotification.validationScheme = {
  body: {
    orderid: Joi.string(),
    userId: Joi.any(),
    companyid: Joi.any(),
    date: Joi.date(),
    text: Joi.string(),
    status: Joi.string(),
  },
};

const updateById = async (ctx) => {
  await notificationService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 204;
};
updateById.validationScheme = {
  params: {
    id: Joi.number().integer(),
  },
  body: {
    status: Joi.string(),
  },
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

const markAsReadById = async (ctx) => {
  await notificationService.switchReadStatusById(ctx.params.id, ctx.headers.authorization);
  ctx.status = 204;
};

markAsReadById.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

const archiveById = async (ctx) => {
  await notificationService.switchArchiveStatusById(ctx.params.id, ctx.headers.authorization);
  ctx.status = 204;
};

archiveById.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

module.exports = function installNotificationRouter(app) {
  const router = new Router({
    prefix: '/notification',
  });

  router.get('/:id', authorization(permissions.loggedIn), validate(getById.validationScheme), getById); // nog validation toevoegen
  router.get('/', authorization(permissions.loggedIn), validate(getAll.validationScheme), getAll);
  router.put('/:id', authorization(permissions.loggedIn), validate(updateById.validationScheme), updateById);
  router.post('/', authorization(permissions.loggedIn), validate(createNotification.validationScheme), createNotification);
  router.delete('/:id', authorization(permissions.loggedIn), validate(deleteNotification.validationScheme), deleteNotification);

  router.put('/:id/read', authorization(permissions.loggedIn), validate(markAsReadById.validationScheme), markAsReadById);
  router.put('/:id/archive', authorization(permissions.loggedIn), validate(archiveById.validationScheme), archiveById);
  app.use(router.routes()).use(router.allowedMethods());
};