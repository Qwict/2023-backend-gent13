const { getLogger } = require('../core/logging');
const categoryRepo = require('../repository/category');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const ServiceError = require('../core/serviceError');

const getById = async (id) => {
  debugLog(`Fetching category with id ${id}`);
  const category = await categoryRepo.findById(id);
   if (!category) {
    throw ServiceError.notFound(`Category with id ${id} does not exist`, {
      id,
    });
  }
  return category;
};

const getAll = async () => {
  const categories = await categoryRepo.findAll();

  if (categories.length === 0) {
    throw ServiceError.notFound('No categories found');
  }
  return {
    categories,
    count: categories.length,
  };
};

// BAD CODE
// const getAllIds = async () => {
//   const categories = await getAll();
//   console.log(categories);
//   const ids = categories.map((category) => category.id);
//   return ids;
// };

module.exports = {
  getById,
  getAll,
  // getAllIds,
};