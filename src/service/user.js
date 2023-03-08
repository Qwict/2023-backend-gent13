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

const generateJavaWebToken = async (user) => {
  debugLog(`Generating JWT for ${user.email}`);
  const jwtPackage = {
    name: user.name,
    email: user.email,
    permission: user.role,
  };
  const token = jwt.sign(jwtPackage, process.env.JWT_SECRET, {
    expiresIn: 36000,
    issuer: process.env.AUTH_ISSUER,
    audience: process.env.AUTH_AUDIENCE,
  });
  return token;
};

const getByToken = async (token) => {
  debugLog(`Decoding token ${token}`);
  const user = jwt.decode(token);
  return user;
};

const getUserByEmail = async (email) => {
  debugLog(`Getting user with email: ${email}`);
  const user = await userRepository.findByMail(email);
  return user;
};

const getUser = async (token) => {
  const { email } = await getByToken(token);
  debugLog(`Getting formatted user with email: ${email}`);
  const user = await userRepository.findByMail(email);
  const formattedUser = await userRepository.getUser(user.id);
  return formattedUser;
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
      permission: user.role,
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
    const token = await generateJavaWebToken(user);
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
  const verification = {
    token: undefined,
    validated: false,
  };
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });
  } catch (error) {
    throw ServiceError.forbidden(`Verification failed for token ${token}`);
  }
    const user = await userRepository.findByMail(decoded.email);
    if (user.role !== decoded.permission) {
      const jwtPackage = {
        name: user.name,
        email: user.email,
        permission: user.role,
      };

      const newToken = jwt.sign(jwtPackage, process.env.JWT_SECRET, {
        expiresIn: 36000,
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      });
      verification.token = newToken;
      verification.validated = true;
      return verification;
    }
    if (decoded) {
      verification.validated = true;
      return verification;
    }

  return verification;
};

const join = async ({
  token,
  companyVAT,
}) => {
  const { email } = await getByToken(token);
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
    debugLog(e);
    throw ServiceError.notFound(`${companyVAT} was not found`);
  }
};

const update = async (token, {
  name,
  email,
  firstName,
  lastName,
}) => {
  const decodedUser = await getByToken(token);
  const originalEmail = decodedUser.email;
  const user = await getUserByEmail(originalEmail);
  debugLog(`updating user with id ${user.id}`);
  const updatedUserId = await userRepository.updateById(user.id, {
    name: (name || user.name),
    email: (email || user.email),
    firstName: (firstName || user.firstName),
    lastName: (lastName || user.lastName),
  });
  const updatedUser = await userRepository.findById(updatedUserId);
  const verification = {
    token: undefined,
    validated: false,
  };
  if (updatedUser) {
    const updatedToken = await generateJavaWebToken(updatedUser);
    const formatedUpdatedUser = userRepository.formatUser(updatedUser);
    verification.token = updatedToken;
    verification.updatedUser = formatedUpdatedUser;
    verification.validated = true;
  }
  return verification;
};

const getAllEmployees = async (companyID) => {
  debugLog(`Fetching all employees with companyID ${companyID}`);
  try {
    const employees = await userRepository.getAllEmployees(companyID);
    return employees;
  } catch (e) {
    throw ServiceError.notFound(`${companyID} was not found`);
  }
};

module.exports = {
  getByToken,
  register,
  login,
  verify,
  join,
  update,
  getAllEmployees,
  getUserByEmail,
  getUser,
};