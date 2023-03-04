const Router = require('@koa/router');

const installHealthRouter = require('./_health');
const installUserRouter = require('./_user');
const installCompanyRouter = require('./_company');
const installProductRouter = require('./_product');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);
  installProductRouter(router);
  installUserRouter(router);
  installCompanyRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};