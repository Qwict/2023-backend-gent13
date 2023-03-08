const { tables, getKnex } = require('../data');

async function findById(id) {
  const notification = await getKnex()(tables.notification).where('id', id).first()
   return notification;
}
const findAll = async () => {
  const notifications = await getKnex()(tables.notification)
    .select()
    .orderBy('id', 'ASC');
  return notifications;
};

const create = async ({
    date,
    text,
    status,
    orderid,
    companyid,
  }) => {
    try {
      const [id] = await getKnex()(tables.notification)
        .insert({
            date,
            text,
            status,
            orderid: orderid,
            companyid: companyid,
        });
        console.log(tables.notification)
      return id;
    } catch (error) {
      const logger = getLogger();
      logger.error('Error in create', {
        error,
      });
      throw error;
    }
  };
  const deleteById = async (id) => {
    try {
      const rowsAffected = await getKnex()(tables.notification)
        .delete()
        .where('id', id);
  
      return rowsAffected > 0;
    } catch (error) {
      const logger = getLogger();
      logger.error('Error in deleteById', {
        error,
      });
      throw error;
    }
  };
module.exports = {
  findById,
  findAll,
  create,
  deleteById,
};
