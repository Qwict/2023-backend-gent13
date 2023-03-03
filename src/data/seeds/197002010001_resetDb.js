module.exports = {
  seed: async (knex) => {
    await knex('company').delete();
    await knex('orderitem').delete();
    await knex('order').delete();
    await knex('productunitofmeasureconverion').delete();
    await knex('productprice').delete();
    await knex('productdescription').delete();
    await knex('product').delete();
    await knex('user').delete();
  },
};