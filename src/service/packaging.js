const { getLogger } = require('../core/logging');
const packagingRepo = require('../repository/packaging');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getById = async (id) => {
  debugLog(`Fetching pacakging with id ${id}`);
  const packaging = await packagingRepo.findById(id);
   if (!packaging) {
    throw ServiceError.notFound(`Packaging with id ${id} does not exist`, {
      id,
    });
  }
  return packaging;
};

const getAll = async () => {
  debugLog(`Fetching all packaging`);
  const packaging = await packagingRepo.findAll();
  if (packaging.length === 0) {
    throw ServiceError.notFound('No packaging found');
  }
  return {
    items: packaging,
    count: packaging.length,
  };
};

module.exports = {
  getById,
  getAll,
};