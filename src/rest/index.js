const Router = require('@koa/router');
const path = require('path');
const serve = require('koa-static');

const mount = require('koa-mount');
const installHealthRouter = require('./_health');
const installOrderRouter = require('./_order');
const installUserRouter = require('./_user');
const installCompanyRouter = require('./_company');
const installProductRouter = require('./_product');
const installCategoryRouter = require('./_category');
const installNotificationsRouter = require('./_notifications');
const installDeliveryRouter = require('./_delivery');
const installPackageRouter = require('./_packaging');

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
  installNotificationsRouter(router);
  installDeliveryRouter(router);
  installPackageRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
  app.use(mount('/api', serve(path.join(__dirname, '../../uploads'))));
};