const {
  tables,
  getKnex,
} = require('../data');

async function findById(id) {
  const deliveryService = await getKnex()(tables.delivery_service).where('id', id).first();
  return deliveryService;
}

const findByVat = async (vat) => {
  const deliveryService = await getKnex()(tables.delivery_service).where('vat_number', vat).first();
  return deliveryService;
};

const findAll = async () => {
  const deliServices = await getKnex()(tables.delivery_service).select();
  return deliServices;
};

module.exports = {
  findById,
  findAll,
  findByVat,
};