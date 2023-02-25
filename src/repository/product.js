const {
  tables,
  getKnex,
} = require('../data');

async function findById(id) {
  const product = await getKnex()(tables.product)
    .where('id', id)
    .first();
  return product;
}
// seeds en migrations voor product nog toevoegen
const SELECT_COLUMNS = [
  'id', 'naam', 'foto', 'omschrijving', 'prijs', 'aantalInStock', 'vermoedelijkeLevertijd',
];

const findAll = async () => {
  const products = await getKnex()(tables.product)
    .select(SELECT_COLUMNS)
    .orderBy('id', 'DESC');
  return products;
};

module.exports = {
  findById,
  findAll,
};