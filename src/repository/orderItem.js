const {
  tables,
  getKnex,
} = require('../data');

async function findByOrder(orderId) {
  const orderItems = await getKnex()(tables.orderItem).where('orderId', orderId);
  return orderItems;
}

const findByProduct = async (productId) => {
  const orderItems = await getKnex()(tables.orderItem).where('productId', productId);
  return orderItems;
};

const create = async ({
 orderId, productId, quantity, netPrice,
}) => {
  const id = await getKnex(tables.order).insert({
    orderId,
    productId,
    quantity,
    netPrice,
  });
  return id;
};

module.exports = {
  findByOrder,
  findByProduct,
  create,
};