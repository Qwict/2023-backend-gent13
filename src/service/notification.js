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

const getAll = async (token, archived = 0) => {
  const user = await userService.getByToken(token);
  let notifications = [];
  let companyNotifications = [];
  let filteredCompanyNotifications = [];
  let privateNotifications = [];

  // Get all private notifications
  notifications = await notificationRepository.findAllByUser(user.id);
  privateNotifications = notifications.filter((notification) => notification.audience === 'private');
  // List all notifications for company users
  if (user.companyId && user.role !== 'pending') {
    companyNotifications = await notificationRepository.findAllByCompany(user.companyId);
    if (user.role !== 'admin') {
      filteredCompanyNotifications = companyNotifications.filter((notification) => notification.audience === 'company');
    } else {
      filteredCompanyNotifications = companyNotifications;
    }
  }

  notifications = [...privateNotifications, ...filteredCompanyNotifications];
  notifications = notifications.filter((notification) => notification.archived === archived);
  // notifications = notifications.sort(function (a, b) {
  //   return a.status - b.status || new Date(b.date) - new Date(a.date)
  // });
  notifications.sort((a, b) => (
    a.status - b.status || new Date(b.date) - new Date(a.date)
  ));

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
    await notificationRepository.changeReadStatusById(id, changes);
  } else {
    debugLog(`Marking notification with ${id} as read (user: ${user.email}))`);
    const changes = {
      status: 1,
      readBy: user.email,
    };
    await notificationRepository.changeReadStatusById(id, changes);
  }
};

const switchArchiveStatusById = async (id, token) => {
  const user = await userService.getByToken(token);
  const notification = await getById(id);
  if (notification.archived === 1) {
    const changes = {
      archived: 0,
      archivedBy: null,
    };
    await notificationRepository.changeArchiveStatusById(id, changes);
    debugLog(`Notification was UNarchived by ${user.email}`);
  } else {
    const changes = {
      archived: 1,
      archivedBy: user.email,
      readBy: notification.readBy || user.email,
    };
    await notificationRepository.changeArchiveStatusById(id, changes);
    debugLog(`Notification was archived by ${user.email}`);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  switchReadStatusById,
  switchArchiveStatusById,
  deleteById,
};