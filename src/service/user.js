const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const saltRound = 10;
const database = require('../repository/user');

const getById = async(id) => {
  const user = await database.findById(id);
  return user;
}

const register = async ({name,email, password}) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async function(err, hash) {
      const newUser = {name,email,salt,hash}
      await database.create(newUser);
    });
  });
}

const verify = async ({email, password}) => {
  var verification = {token: undefined, validated: false};
  const user = await database.findByMail(email);

  if (!user) {
    return verification;
  }

  const result = bcrypt.compareSync(password,user.hash);
  if (result) {
      const token = jwt.sign(user,'supersecret',{expiresIn: 1200});
      verification.token = token;
      verification.validated = true
  }
  
  return verification;
}

module.exports = {
  getById,
  register,
  verify
}