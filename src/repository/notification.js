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

const findAllByUser = async (buyerId) => {
  const notifications = await getKnex()(tables.notification).select()
    .where('buyerId', buyerId)
    .orderBy('date', 'ASC');
  return notifications;
};

const create = async ({
  orderid,
  buyerId,
  companyid,
  date,
  text,
  status,
  }) => {
      const [id] = await getKnex()(tables.notification)
        .insert({
          orderid,
          buyerId,
          companyid,
          date,
          text,
          status,
        });
      return id;
  };

const updateById = async (id, status) => {
  await getKnex()(tables.notification)
  .insert({
    status,
  });
  return id;
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