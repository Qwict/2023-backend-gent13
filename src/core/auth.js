const jwt = require('jsonwebtoken');
const ServiceError = require('./serviceError');

// disabled for linting
// const {
//   getLogger,
// } = require('./logging');

const permissions = Object.freeze({
  loggedIn: 'loggedIn',
  admin: 'admin',
});

function authorization(permission) {
  return async (ctx, next) => {
    // const logger = getLogger();
    const token = ctx.headers.authorization;
    // logger.debug(`hasPermission: ${JSON.stringify(user)}`);
    let user;
    if (!token) {
      throw ServiceError.unauthorized('No valid token');
    } else {
      // Throws error if verification fails
      try {
        // const decoded = // disabled for linting
          user = jwt.verify(token, process.env.JWT_SECRET, {
          issuer: process.env.AUTH_ISSUER,
          audience: process.env.AUTH_AUDIENCE,
        });
      } catch (error) {
        throw ServiceError.forbidden('Token validation failed');
      }
    }
    console.log(user.permission);
    if (user && permission === permissions.loggedIn) {
      await next();
    } else if (user && user.permission && user.permission === permissions.admin) {
      await next();
  } else {
    throw ServiceError.unauthorized(`You do not have the necessary permission of ${permission}`);
  }
  };
}

module.exports = {
  authorization,
  permissions,
};