const Router = require('@koa/router');

const installHealthRouter = require('./_health');
const installOrderRouter = require('./_order');
const installUserRouter = require('./_user');
const installProductRouter = require('./_product');
const installCategoryRouter = require('./_category');
const installNotificationRouter = require('./_category');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);
  installOrderRouter(router);
  installCategoryRouter(router);
  installProductRouter(router);
  installUserRouter(router);
  installNotificationRouter(router)

  app.use(router.routes()).use(router.allowedMethods());
};