const { tables, getKnex } = require('../data');

async function findById(id) {
  const notification = await getKnex()(tables.notification).where('id', id).first();
  return notification;
}
const findAllByCompany = async (companyId) => {
  const notifications = await getKnex()(tables.notification).select()
    .where('company_id', companyId);
  return notifications;
};

const findAllByUser = async (userId) => {
  const notifications = await getKnex()(tables.notification).select()
    .where('user_id', userId)
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
      order_id: orderId,
      user_id: userId,
      company_id: companyId,
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
      read_by: readBy,
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
      archived_by: archivedBy,
      read_by: readBy,
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