const Router = require('@koa/router');

const installHealthRouter = require('./_health');
const installUserRouter = require('./_user');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);
  installUserRouter(router);


  app.use(router.routes()).use(router.allowedMethods());
};