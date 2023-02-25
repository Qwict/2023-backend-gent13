const jwt = require('jsonwebtoken');
const ServiceError = require('../core/serviceError');

const {
	getLogger,
} = require('./logging');

function authorization(permission) {
  return async (ctx, next) => {
		// const logger = getLogger();
		const token = ctx.headers.authorization;
		// logger.debug(`hasPermission: ${JSON.stringify(user)}`);


		if (!token) {
			throw ServiceError.unauthorized('No valid token');
		} else{
      //Throws error if verification fails
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
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

const permissions = Object.freeze({
	loggedIn: 'loggedIn',
});

module.exports = {
	authorization,
	permissions,
};