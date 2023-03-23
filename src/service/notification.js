const { getLogger } = require('../core/logging');
const notificationRepository = require('../repository/notification');
const userService = require('./user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getById = async (id) => {
  debugLog(`Fetching notification with id ${id}`);
  const notification = await notificationRepository.findById(id);
  if (!notification) {
    throw ServiceError.notFound(`Notification with id ${id} does not exist`, {
      id,
    });
  }
  return notification;
};

const getAll = async (token, archived = false) => {
  const user = await userService.getByToken(token);
  let notifications = [];

  if (user.companyId && user.role !== 'pending') {
    notifications = await notificationRepository.findAllByCompany(user.companyId);
    if (user.role !== 'admin') {
      notifications = notifications.filter((notification) => notification.audience !== 'admin');
    }
  } else if (user.userId) {
    notifications = await notificationRepository.findAllByUser(user.userId);
    notifications = notifications.filter((notification) => notification.companyId === null);
  }

  notifications = notifications.filter((notification) => notification.archived !== archived);

  return {
    items: notifications,
    count: notifications.length,
  };
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
  const newNotification = {
    orderId,
    userId,
    companyId,
    date,
    audience,
    subject,
    text,
  };
  debugLog('Creating new notification', newNotification);
  const id = await notificationRepository.create(newNotification);
  return getById(id);
};

const deleteById = async (id) => {
  debugLog(`Deleting notification with id ${id}`);
  await notificationRepository.deleteById(id);
};

const switchReadStatusById = async (id, token) => {
  const user = await userService.getByToken(token);
  const notification = await getById(id);
  if (notification.status === 1) {
    debugLog(`Marking notification with ${id} as unread`);
    const changes = {
      status: 0,
      readBy: null,
    };
    await notificationRepository.updateById(id, changes);
  } else {
    debugLog(`Marking notification with ${id} as read (user: ${user.email}))`);
    const changes = {
      status: 1,
      readBy: user.email,
    };
    await notificationRepository.updateById(id, changes);
  }
};

const switchArchiveStatus = async (id, token) => {
  const user = await userService.getByToken(token);
  const notification = await getById(id);
  debugLog(`Notification was archived ${id}`);
  if (notification.archived) {
    await notificationRepository.updateById(id, !notification.archived);
  } else {
    await notificationRepository.updateById(id, !notification.archived, user.email);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  switchReadStatusById,
  switchArchiveStatus,
  deleteById,
};