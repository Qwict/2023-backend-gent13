const Joi = require('joi');
const Router = require('@koa/router');
// eslint-disable-next-line import/no-extraneous-dependencies
const { Server } = require('socket.io');
const config = require('config');

const notificationService = require('../service/notification');
const validate = require('./_validation');
const { authorization, permissions } = require('../core/auth');

const io = new Server(9001, {
  cors: {
    origin: config.get('cors.origins'),
    methods: ["GET", "POST"],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization', 'Origin'],
    maxAge: 3600,
    credentials: true,
  },
});

const getById = async (ctx) => {
  ctx.body = await notificationService.getById(ctx.params.id);
  ctx.status = 200;
};
getById.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

const getAll = async (ctx) => {
  ctx.body = await notificationService.getAll(ctx.headers.authorization);
  ctx.status = 200;
};
getAll.validationScheme = {
  headers: {
    authorization: Joi.string(),
  },
};

const getAllArchived = async (ctx) => {
  ctx.body = await notificationService.getAll(ctx.headers.authorization, 1);
  ctx.status = 200;
};
getAllArchived.validationScheme = {
  headers: {
    authorization: Joi.string(),
  },
};

// const createNotification = async (ctx) => {
//   const newNotification = await notificationService.create(ctx.request.body);
//   ctx.body = newNotification;
//   ctx.status = 201;
// };

// createNotification.validationScheme = {
//   body: {
//     orderId: Joi.string(),
//     userId: Joi.any(),
//     companyId: Joi.any(),
//     date: Joi.date(),
//     text: Joi.string(),
//     status: Joi.string(),
//   },
// };

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

const switchReadStatusById = async (ctx) => {
  await notificationService.switchReadStatusById(ctx.params.id, ctx.headers.authorization);
  ctx.status = 204;
};

switchReadStatusById.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

const switchArchiveStatusById = async (ctx) => {
  await notificationService.switchArchiveStatusById(ctx.params.id, ctx.headers.authorization);
  ctx.status = 204;
};

switchArchiveStatusById.validationScheme = {
  params: {
    id: Joi.string(),
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

io.on('connection', (socket) => {
  socket.on('ping notification', async (token) => {
    try {
      const notifications = await notificationService.getAll(token);
      socket.emit('pong notification', notifications);
    } catch (error) {
      const notifications = { items: [], count: 0 };
      socket.emit('pong notification', notifications);
    }
  });
});

module.exports = function installNotificationRouter(app) {
  const router = new Router({
    prefix: '/notifications',
  });

  // router.get('/:id', authorization(permissions.loggedIn), validate(getById.validationScheme), getById); // nog validation toevoegen
  router.put('/:id', authorization(permissions.loggedIn), validate(updateById.validationScheme), updateById);
  // router.delete('/:id', authorization(permissions.loggedIn), validate(deleteNotification.validationScheme), deleteNotification);

  router.get('/', authorization(permissions.loggedIn), validate(getAll.validationScheme), getAll);
  // router.get('/archived', authorization(permissions.loggedIn), validate(getAllArchived.validationScheme), getAllArchived);
  router.get('/archived', authorization(permissions.loggedIn), validate(getAllArchived.validationScheme), getAllArchived);
  // router.post('/', authorization(permissions.loggedIn), validate(createNotification.validationScheme), createNotification);

  router.put('/:id/read', authorization(permissions.loggedIn), validate(switchReadStatusById.validationScheme), switchReadStatusById);
  router.put('/:id/archive', authorization(permissions.loggedIn), validate(switchArchiveStatusById.validationScheme), switchArchiveStatusById);

  app.use(router.routes()).use(router.allowedMethods());
};