const bcrypt = require("bcrypt");

const saltRound = 10;
const database = "placeholder"

const register = async (name, password) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async function(err, hash) {
      await database.save(name, salt, hash)
    });
  });
}

const verify = async (name, password) => {
  const user = await database.getByName(name);
  if (!user) {
    return false;
  }
  bcrypt.compare(password, user.hash, function(err, result) {
    if(result){
      return true;
    }
    return false;
  })
}