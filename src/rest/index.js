const Router = require('@koa/router');
const path = require('path');
const serve = require('koa-static');

const installHealthRouter = require('./_health');
const installUserRouter = require('./_user');
const installProductRouter = require('./_product');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);
  installProductRouter(router);
  installUserRouter(router);

  app.use(serve(path.join(__dirname, '../../uploads')));

  app.use(router.routes()).use(router.allowedMethods());
};