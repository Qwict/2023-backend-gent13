const uuid = require('uuid');
const { tables, getKnex } = require('../data');
const { getLogger } = require('../core/logging');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
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
  const id = uuid.v4();
  await getKnex()(tables.notification)
    .insert({
      id,
      orderId: orderId || null,
      userId: userId || null,
      companyId: audience === 'private' ? null : companyId || null,
      date,
      audience: audience || 'private',
      subject: subject || 'No Subject',
      text: text || 'Extra information not specified',
      status: false,
      archived: false,
    });
  debugLog(`NOTIFICATION FACTORY - ${audience}: ${subject} -> ${text}`);
};

module.exports = {
  create,
};