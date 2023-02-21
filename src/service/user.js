const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const database = require('../repository/user');

const getById = async (id) => {
  const user = await database.findById(id);
  return user;
}

const register = async ({
  name,
  email,
  password
}) => {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64');

  const newUser = {
    name,
    email,
    salt,
    hash
  };
  const user = await database.create(newUser);
  return jwt.sign(user, 'supersecret', {
    expiresIn: 36000,
  });
}

const login = async ({
  email,
  password
}) => {
  var verification = {
    token: undefined,
    validated: false
  };
  const user = await database.findByMail(email);

  if (!user) {
    return verification;
  }
  const result = user.hash === crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha256').toString('base64');
  if (result) {
    const token = jwt.sign(user, 'supersecret', {
      expiresIn: 36000,
    });
    verification.token = token;
    verification.validated = true
  }

  return verification;
}

const verify = async ({token}) => {
  try {
  const decoded = jwt.verify(token, 'supersecret');
  if (decoded) {
    return true;
  }
} catch (error) {
    return false;
  }
}

module.exports = {
  getById,
  register,
  login,
  verify,
}