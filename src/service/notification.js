const { getLogger } = require('../core/logging');
const database = require('../repository/notification');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getById = async (id) => {
  debugLog(`Fetching notification with id ${id}`);
  const notification = await database.findById(id);
   if (!notification) {
    throw ServiceError.notFound(`Notification with id ${id} does not exist`, {
      id,
    });
  }
  return notification;
};

const getAll = async () => {
  const notifications = await database.findAll();

  if (notifications.length === 0) {
    throw ServiceError.notFound('No notifictions found');
  }
  return {
    notifications,
    count: notifications.length,
  };
};

const register = async ({
    date,
    text,
    status,
    orderid,
    companyid,
  }) => {
    const newNotification = {
        date,
        text,
        status,
        orderid,
        companyid,
    };
    debugLog('Creating new product', newNotification);
    const id = await database.create({
        date,
        text,
        status,
        orderid,
        companyid,
    });
    return getById(id);
  };
  

  const deleteById = async (id) => {
    debugLog(`Deleting notification with id ${id}`);
    await database.deleteById(id);
  };

module.exports = {
  getById,
  getAll,
  register,
  deleteById
};
