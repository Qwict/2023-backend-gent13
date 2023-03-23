const uuid = require('uuid');
const { tables, getKnex } = require('../data');

const create = async ({
  orderId,
  userId,
  companyId,
  date,
  audience,
  subject,
  text,
}) => {
  const id = uuid.v4();
  await getKnex()(tables.notification)
    .insert({
      id,
      orderId: orderId || null,
      userId: userId || null,
      companyId: companyId || null,
      date,
      audience: audience || 'private',
      subject: subject || 'No Subject',
      text: text || 'Extra information not specified',
    });
};

module.exports = {
  create,
  // update,
};