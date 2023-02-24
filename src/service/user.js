const {
  getLogger,
} = require('../core/logging');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ServiceError = require('../core/serviceError');

const database = require('../repository/user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`)
  const user = await database.findById(id);
  return user;
}

const register = async ({
  name,
  email,
  password
}) => {
  debugLog(`Creating user with name ${name} and email ${email}`);
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64');

  const newUser = {
    name,
    email,
    salt,
    hash
  };
  const user = await database.create(newUser);
  const jwtPackage = {
    name: user.name,
    email: user.email,
  }
  return jwt.sign(jwtPackage, process.env.JWT_SECRET, {
    expiresIn: 36000,
    issuer: process.env.AUTH_ISSUER,
    audience: process.env.AUTH_AUDIENCE,
  });
}

const login = async ({
  email,
  password
}) => {

  debugLog(`Verifying user with email ${email}`);
  var verification = {
    token: undefined,
    validated: false
  };
  const user = await database.findByMail(email);

  if (!user) {
   throw ServiceError.notFound(`There is no user with email ${email}`);
  }
  const result = user.hash === crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha256').toString('base64');
  if (result) {
    const jwtPackage = {
      name: user.name,
      email: user.email
    };
    const token = jwt.sign(jwtPackage, process.env.JWT_SECRET, {
      expiresIn: 36000,
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });
    verification.token = token;
    verification.validated = true
  } else {
   throw ServiceError.forbidden(`Verification failed for user with email ${email}`)
  }

  return verification;
}

const verify = async ({
  token
}) => {
  debugLog(`Verifying token ${token}`);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });
    if (decoded) {
      return true;
    }
  } catch (error) {
    throw ServiceError.forbidden(`Verification failed for token ${token}`);
  }
  return false;
}

module.exports = {
  getById,
  register,
  login,
  verify,
}