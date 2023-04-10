const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.order).insert([
      {
        id: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
        buyer_id: "4b09960e-0864-45e0-bab6-6cf8c7fc4626",
        customer_id: 1,
        from_company_id: 1,
        packaging_id: 1,
        order_reference: "REF1",
        order_date_time: "Fri Mar 03 2023 15:34:55 GMT+0100 (Central European Standard Time)",
        net_price: 49.99,
        tax_price: 0,
        total_price: 49.99,
        order_status: 0,
      },
    ]);
  },
};