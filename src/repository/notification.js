const { tables, getKnex } = require('../data');

async function findById(id) {
  const notification = await getKnex()(tables.notification).where('id', id).first();
  return notification;
}
const findAllByCompany = async (companyId) => {
  const notifications = await getKnex()(tables.notification).select()
    .where('companyId', companyId);
  return notifications;
};

const findAllByUser = async (userId) => {
  const notifications = await getKnex()(tables.notification).select()
    .where('userId', userId)
    .andWhere('audience', 'private')
    .orWhere('audience', 'all');
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
      archived: false,
      status: false,
    });
  return id;
};

const changeReadStatusById = async (id, {
  status,
  readBy,
}) => {
  await getKnex()(tables.notification)
    .update({
      status,
      readBy,
    })
    .where('id', id);
};

const changeArchiveStatusById = async (id, {
  archived,
  archivedBy,
  readBy,
}) => {
  await getKnex()(tables.notification)
    .update({
      archived,
      archivedBy,
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
  changeReadStatusById,
  changeArchiveStatusById,
  deleteById,
};