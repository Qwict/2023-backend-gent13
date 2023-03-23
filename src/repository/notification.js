const { tables, getKnex } = require('../data');

async function findById(id) {
  const notification = await getKnex()(tables.notification).where('id', id).first();
  return notification;
}
const findAllByCompany = async (companyId) => {
  const notifications = await getKnex()(tables.notification).select()
    .where('companyId', companyId)
    .orderBy('date', 'ASC');
  return notifications;
};

const findAllByUser = async (userId) => {
  const notifications = await getKnex()(tables.notification).select()
    .where('userId', userId)
    .orderBy('date', 'ASC');
  return notifications;
};

const create = async ({
  orderId,
  userId,
  companyId,
  date,
  audience,
  subject,
  text,
}) => {
  const [id] = await getKnex()(tables.notification)
    .insert({
      orderId,
      userId,
      companyId,
      date,
      audience,
      subject,
      text,
    });
  return id;
};

const updateById = async (id, {
  status,
  readBy = '',
}) => {
  await getKnex()(tables.notification)
    .update({
      status,
      readBy,
    })
    .where('id', id);
};

const deleteById = async (id) => {
  const rowsAffected = await getKnex()(tables.notification)
    .delete()
    .where('id', id);

  return rowsAffected > 0;
};
module.exports = {
  findById,
  findAllByCompany,
  findAllByUser,
  create,
  updateById,
  deleteById,
};