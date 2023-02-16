const Router = require('@koa/router');

const installHealthRouter = require('./_health');


module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};