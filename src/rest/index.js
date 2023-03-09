const Router = require('@koa/router');

const installHealthRouter = require('./_health');
const installOrderRouter = require('./_order');
const installUserRouter = require('./_user');
const installCompanyRouter = require('./_company');
const installProductRouter = require('./_product');
const installCategoryRouter = require('./_category');
const installNotificationRouter = require('./_notification');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);
  installOrderRouter(router);
  installCategoryRouter(router);
  installProductRouter(router);
  installUserRouter(router);
  installCompanyRouter(router);
  installNotificationRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};