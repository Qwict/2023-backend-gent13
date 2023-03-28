const {
  tables,
  getKnex,
} = require('../data');

const SELECT_COLUMNS = [
  `${tables.orderItem}.orderId`, `${tables.orderItem}.productId`, `${tables.orderItem}.quantity`, `${tables.orderItem}.netPrice`,
  `${tables.product}.image`, `${tables.productDescription}.name`,
  `${tables.company}.name as companyName`, `${tables.company}.logoImg`,
];

async function findByOrder(orderId) {
  const orderItems = await getKnex()(tables.orderItem).select(SELECT_COLUMNS)
  .join(tables.product, `${tables.product}.id`, '=', `${tables.orderItem}.productId`)
  .join(tables.productDescription, `${tables.productDescription}.productId`, '=', `${tables.product}.id`)
  .join(tables.productPrice, `${tables.productPrice}.productId`, '=', `${tables.product}.id`)
  .join(tables.company, `${tables.company}.id`, '=', `${tables.product}.companyId`)
  .where(`${tables.orderItem}.orderId`, orderId)
  .andWhere(`${tables.productDescription}.languageId`, 'en');
  return orderItems;
}

const findByProduct = async (productId) => {
  const orderItems = await getKnex()(tables.orderItem).select(SELECT_COLUMNS)
  .join(tables.product, `${tables.product}.id`, '=', `${tables.orderItem}.productId`)
  .join(tables.productDescription, `${tables.productDescription}.productId`, '=', `${tables.product}.id`)
  .join(tables.productPrice, `${tables.productPrice}.productId`, '=', `${tables.product}.id`)
  .join(tables.company, `${tables.company}.id`, '=', `${tables.product}.companyId`)
  .where('productId', productId)
  .andWhere(`${tables.productDescription}.languageId`, 'en');
  return orderItems;
};

const create = async ({
 orderId, productId, quantity, netPrice,
}) => {
  const id = await getKnex()(tables.orderItem).insert({
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