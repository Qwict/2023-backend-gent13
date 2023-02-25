const jwt = require('jsonwebtoken');
const ServiceError = require('./serviceError');

// disabled for linting
// const {
//   getLogger,
// } = require('./logging');

const permissions = Object.freeze({
  loggedIn: 'loggedIn',
});

function authorization(permission) {
  return async (ctx, next) => {
    // const logger = getLogger();
    const token = ctx.headers.authorization;
    // logger.debug(`hasPermission: ${JSON.stringify(user)}`);

    if (!token) {
      throw ServiceError.unauthorized('No valid token');
    } else {
      // Throws error if verification fails
      try {
        // const decoded = // disabled for linting
        jwt.verify(token, process.env.JWT_SECRET, {
          issuer: process.env.AUTH_ISSUER,
          audience: process.env.AUTH_AUDIENCE,
        });
      } catch (error) {
        throw ServiceError.unauthorized('Token validation failed');
      }
    }

    if (token && permission === permissions.loggedIn) {
      await next();
    }
  };
}

module.exports = {
  authorization,
  permissions,
};