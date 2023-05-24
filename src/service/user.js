const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');

const userRepository = require('../repository/user');
const notificationFactory = require('../repository/notificationFactory');
const companyRepository = require('../repository/company');

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
  // debugLog(`Decoding token ${token}`);
  if (token) {
    const decodedUser = jwt.decode(token);
    const user = userRepository.findByMail(decodedUser.email);
    return user;
  }
  throw ServiceError.forbidden('No token provided');
};

const getUserByEmail = async (email) => {
  debugLog(`Getting user with email: ${email}`);
  const user = await userRepository.findByMail(email);
  return user;
};

const getById = async (id) => {
  debugLog(`Fetching user with id: ${id}`);
  const user = await userRepository.findById(id);
  return user;
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

const promote = async ({ token, email, role }) => {
  debugLog(`Promoting user with ${email} to ${role}`);
  // try {
  const decodedAdmin = await getByToken(token);
  const admin = await getUserByEmail(decodedAdmin.email);
  const user = await getUserByEmail(email);
  if (user.companyId === admin.companyId) {
    let { companyId } = user;
    if (role === 'unemployed') {
      companyId = null;
    }
    const promotedUserId = await userRepository.updateById(user.id, {
      ...user,
      role,
      companyId,
    });
    const promotedUser = await userRepository.getUser(promotedUserId);
    debugLog(`Promoted user ${promotedUser.name} (${promotedUser.id} - ${promotedUser.companyId}) to ${role}`);
    notificationFactory.create({
      userId: promotedUser.id,
      date: new Date().toString(),
      audience: 'private',
      subject: 'Company role changed',
      text: `You have been promoted to ${role} by administrator ${admin.name} (${admin.email})`,
    });
    notificationFactory.create({
      userId: admin.id,
      companyId: admin.companyId,
      date: new Date().toString(),
      audience: 'admin',
      subject: `Changed employee role`,
      text: `${admin.name ? `${admin.name} (${admin.email})` : admin.email} promoted ${user.name ? `${user.name} (${user.email})` : user.email} to ${role}`,
    });
  }
};

const getUser = async (token) => {
  const { email } = await getByToken(token);
  debugLog(`Getting formatted user with email: ${email}`);
  const user = await userRepository.findByMail(email);
  const formattedUser = await userRepository.getUser(user.id);
  return formattedUser;
};

const deleteUser = async (token) => {
  const {
    id, email, role, companyId,
  } = await getByToken(token);
  if (role !== 'admin') {
    debugLog(`Deleting ${role} user ${email}`);
    const deleted = await userRepository.deleteById(id);
    if (!deleted) {
      throw ServiceError.notFound(`There is no user with email ${email}`);
    }
  } else {
    const employees = await getAllEmployees(companyId);
    const admins = employees.filter((employee) => employee.role === 'admin');
    if (admins.length > 1) {
      debugLog(`Deleting ADMIN user ${email}`);
      const deleted = await userRepository.deleteById(id);
      if (!deleted) {
        throw ServiceError.notFound(`There is no user with email ${email}`);
      }
    } else {
      throw ServiceError.badRequest(`The ${role} - ${email} is the only admin in the company and can not be deleted`);
    }
  }
  if (companyId) {
    notificationFactory.create({
      companyId,
      date: new Date().toString(),
      audience: 'admin',
      subject: 'Account deleted',
      text: `User ${email} deleted their account`,
    });
  }
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

    notificationFactory.create({
      userId: user.id,
      date: new Date().toString(),
      audience: 'private',
      subject: 'Welcome!',
      text: `Welcome to delaware shipping, ${user.name ? user.name : user.email}`,
    });
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
    throw ServiceError.validationFailed(`Verification failed for token ${token}`);
  }
  const user = await userRepository.findByMail(decoded.email);
  if (!user) {
    throw ServiceError.notFound('user does not exist');
  }
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
  companyId,
}) => {
  const user = await getByToken(token);
  debugLog(`User ${user.email} wants to join company with id: ${companyId}`);
  try {
    const newUser = {
      ...user,
      companyId,
      role: 'pending',
    };
    const updatedUserId = await userRepository.updateById(newUser.id, newUser);
    const updatedUser = await userRepository.findById(updatedUserId);
    debugLog(`User: ${updatedUser.email} is on waiting list to join companyId: ${updatedUser.companyId}`);
  } catch (e) {
    debugLog(e);
    throw ServiceError.notFound(`${companyId} was not found`);
  }
  const company = await companyRepository.findById(companyId);
  notificationFactory.create({
    companyId,
    date: new Date().toString(),
    audience: 'admin',
    subject: 'Pending join request',
    text: `User ${user.email} wants to join your company. It is possible to allow this user to join your company in the admin panel.`,
  });
  notificationFactory.create({
    userId: user.id,
    date: new Date(),
    audience: 'private',
    subject: 'Pending status',
    text: `You are now on the waiting list to join company ${company.name}`,
  });
};

const update = async (token, {
  name,
  email,
  firstName,
  lastName,
  street,
  streetNumber,
  zipCode,
  city,
  country,
}) => {
  const user = await getByToken(token);
  if (email !== user.email && user.role === 'admin') {
    checkCompanyForAdmins(user);
  }
  const originalEmail = user.email;
  debugLog(`updating user with id ${user.id}`);
  const updatedUserId = await userRepository.updateById(user.id, {
    name: (name || user.name),
    email: (email || user.email),
    firstName: (firstName || user.firstName),
    lastName: (lastName || user.lastName),
    street: (street || user.street),
    streetNumber: (streetNumber || user.streetNumber),
    zipCode: (zipCode || user.zipCode),
    city: (city || user.city),
    country: (country || user.country),
  });
  const updatedUser = await userRepository.findById(updatedUserId);
  const verification = {
    token: undefined,
    validated: false,
  };
  if (updatedUser) {
    const updatedToken = await generateJavaWebToken(updatedUser);
    const formatedUpdatedUser = await userRepository.formatUser(updatedUser);
    verification.token = updatedToken;
    verification.updatedUser = formatedUpdatedUser;
    verification.validated = true;
    debugLog(`Successfully created JWT for user ${updatedUser.name}`);
  }
  debugLog(`User ${user.name} updated`);

  if (email !== originalEmail) {
    if (user.companyId) {
      notificationFactory.create({
        companyId: user.companyId,
        date: new Date().toString(),
        audience: 'admin',
        subject: 'User changed email',
        text: `User ${originalEmail} changed email to ${email}`,
      });
      debugLog(`User ${user.name} changed email from ${originalEmail} to ${email}`);
    }
    notificationFactory.create({
      userId: user.id,
      date: new Date(),
      audience: 'private',
      subject: 'Email changed',
      text: `Your email has been changed from ${originalEmail} to ${email}`,
    });
  }
  return verification;
};

const checkCompanyForAdmins = async (user) => {
  debugLog(`Checking if company ${user.companyId} has admins`);
  const employees = await getAllEmployees(user.companyId);
  const admins = employees.filter((employee) => employee.role === 'admin');
  if (admins.length > 1) {
    return true;
  }
  throw ServiceError.badRequest(`The ${user.role} - ${user.email} is the only admin in the company and can not be deleted`);
};

const leaveCompany = async (token) => {
  const user = await getByToken(token);
  if (user.role !== 'admin') {
    debugLog(`User ${user.name} wants to leave company`);
    const newUser = {
      ...user,
      companyId: null,
      role: 'unemployed',
    };
    const updatedUserId = await userRepository.updateById(newUser.id, newUser);
    const updatedUser = await getById(updatedUserId);
    if (!updatedUserId) {
      throw ServiceError.notFound(`There is no user with email ${user.email}`);
    }
    debugLog(`${user.name} left company (${user.companyId} -> ${updatedUser.companyId}), role changed from ${user.role} -> ${updatedUser.role}`);
  } else {
    const employees = await getAllEmployees(user.companyId);
    const admins = employees.filter((employee) => employee.role === 'admin');
    if (admins.length > 1) {
      debugLog(`User ${user.name} wants to leave company`);
      const newUser = {
        ...user,
        companyId: null,
        role: 'unemployed',
      };
      const updatedUserId = await userRepository.updateById(newUser.id, newUser);
      const updatedUser = await getById(updatedUserId);
      if (!updatedUserId) {
        throw ServiceError.notFound(`There is no admin with email ${user.email}`);
      }
      debugLog(`ADMIN ${user.name} left company (${user.companyId} -> ${updatedUser.companyId}), role changed from ${user.role} -> ${updatedUser.role}`);
    } else {
      throw ServiceError.badRequest(`The ${user.role} - ${user.email} is the only admin in the company and can not be deleted`);
    }
  }
  notificationFactory.create({
    userId: user.id,
    date: new Date().toString(),
    audience: 'private',
    subject: 'Left company',
    text: `You left a company`,
  });
  notificationFactory.create({
    companyId: user.companyId,
    date: new Date().toString(),
    audience: 'admin',
    subject: 'Left company',
    text: `${user.name} (${user.email}) left the company`,
  });
};

module.exports = {
  getById,
  getByToken,
  register,
  login,
  verify,
  join,
  update,
  getAllEmployees,
  getUserByEmail,
  getUser,
  deleteUser,
  promote,
  leaveCompany,
};