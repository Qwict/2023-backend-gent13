const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');

const userRepository = require('../repository/user');
const companyService = require('./company');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getByToken = async (token) => {
  debugLog(`Decoding token ${token}`);
  const user = jwt.decode(token);
  return user;
};

const register = async ({
  name,
  email,
  password,
}) => {
  debugLog(`Creating user with name ${name} and email ${email}`);
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64');

  const newUser = {
    name,
    email,
    salt,
    hash,
  };
  try {
    const user = await userRepository.create(newUser);

  const jwtPackage = {
    name: user.name,
    email: user.email,
  };
  return jwt.sign(jwtPackage, process.env.JWT_SECRET, {
    expiresIn: 36000,
    issuer: process.env.AUTH_ISSUER,
    audience: process.env.AUTH_AUDIENCE,
  });
  } catch (error) {
    if (error.message === 'DUPLICATE_ENTRY') {
      throw ServiceError.duplicate('DUPLICATE ENTRY');
    } else {
      throw ServiceError.validationFailed(error.message);
    }
  }
};

const login = async ({
  email,
  password,
}) => {
  debugLog(`Verifying user with email ${email}`);
  const verification = {
    token: undefined,
    validated: false,
  };
  const user = await userRepository.findByMail(email);

  if (!user) {
    throw ServiceError.notFound(`There is no user with email ${email}`);
  }
  const result = user.hash === crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha256').toString('base64');
  if (result) {
    const jwtPackage = {
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(jwtPackage, process.env.JWT_SECRET, {
      expiresIn: 36000,
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });
    verification.token = token;
    verification.validated = true;
  } else {
    throw ServiceError.forbidden(`Verification failed for user with email ${email}`);
  }

  return verification;
};

const verify = async ({
  token,
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
};

const join = async ({
  email,
  companyVAT,
}) => {
  debugLog(`User ${email} wants to join ${companyVAT}`);
  try {
    const company = await companyService.findByVAT(companyVAT);
    const user = await userRepository.findByMail(email);
    const newUser = {
      ...user,
      companyId: company.id,
    };
    const updatedUserId = await userRepository.updateById(newUser.id, newUser);
    const updatedUser = await userRepository.findById(updatedUserId);
    debugLog(`User: ${updatedUser.email} is on waiting list to join companyId: ${updatedUser.companyId}`);
  } catch (e) {
    debugLog.error(e);
    throw ServiceError.notFound(`${companyVAT} was not found`);
  }
};

module.exports = {
  getByToken,
  register,
  login,
  verify,
  join,
};