const {
  tables,
  getKnex,
} = require('../data');

async function findById(id) {
  const deliveryService = await getKnex()(tables.deliveryService).where('id', id).first();
  return deliveryService;
}

const findByVat = async (vat) => {
  const deliveryService = await getKnex()(tables.deliveryService).where('vatNumber', vat).first();
  return deliveryService;
};

const findAll = async () => {
  const deliServices = await getKnex()(tables.deliveryService).select();
  return deliServices;
};

module.exports = {
  findById,
  findAll,
  findByVat,
};