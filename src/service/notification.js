const { getLogger } = require('../core/logging');
const database = require('../repository/notification');
const userService = require('./user');

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

const getAll = async (token) => {
  const user = await userService.getByToken(token);
  let notifications = [];

  if (user.companyId) {
    notifications = await database.findAllByCompany(user.companyId);
  } else if (user.buyerId) {
    notifications = await database.findAllByUser(user.buyerId);
  }

  return {
    items: notifications,
    count: notifications.length,
  };
};

const create = async ({
    orderid,
    buyerId,
    companyId,
    date,
    text,
    status,
  }) => {
    const newNotification = {
      orderid,
      buyerId,
      companyId,
      date,
      text,
      status,
    };
    debugLog('Creating new notification', newNotification);
    const id = await database.create(newNotification);
    return getById(id);
  };

  const deleteById = async (id) => {
    debugLog(`Deleting notification with id ${id}`);
    await database.deleteById(id);
  };

  const updateById = async (id, { status }) => {
    debugLog(`Updating notification with id ${id}`);
    await database.updateById(id, status);
  };

module.exports = {
  getById,
  getAll,
  create,
  updateById,
  deleteById,
};