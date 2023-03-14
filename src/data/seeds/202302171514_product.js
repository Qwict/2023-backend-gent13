const { tables } = require('..');
// 1 name: 'Sport items',
// 2 name: 'Care items',
// 3 name: 'Hardware items',
// 4 name: 'Telephony items',
// 5 name: 'Computers & Tablets',
// 6 name: 'Image & Sound',
module.exports = {
  seed: async (knex) => {
    await knex(tables.product).insert([
      {
        id: 1,
        productCategoryId: 1,
        stock: 500,
        image: null,
        companyId: 1,
      },
      {
        id: 2,
        productCategoryId: 2,
        stock: 1500,
        image: null,
        companyId: 1,
      },
      {
        id: 3,
        productCategoryId: 3,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Tanita RD-953 Black 215,00
        id: 4,
        productCategoryId: 2,
        stock: 215,
        image: null,
        companyId: 1,
      },
      {
        // Germin vivoactive 219,00
        id: 5,
        productCategoryId: 1,
        stock: 10,
        image: null,
        companyId: 1,
      },
      {
        // Withings Body + Black 92.99
        id: 6,
        productCategoryId: 2,
        stock: 105,
        image: null,
        companyId: 1,
      },
      {
        // Samsung Galaxy S22 128GB 5G 809,00
        id: 7,
        productCategoryId: 4,
        stock: 150,
        image: null,
        companyId: 1,
      },
      {
        // Samsung Galaxy S21 FE 128GB 5G 579,00
        id: 8,
        productCategoryId: 4,
        stock: 579,
        image: null,
        companyId: 1,
      },
      {
        // Samsung Galaxy Z Flip 4 256GB 5G 1145,00
        id: 9,
        productCategoryId: 4,
        stock: 15,
        image: null,
        companyId: 1,
      },
      {
        // Samsung Galaxy Z Fold 4 512GB 5G + Black cover leather 1969,00
        id: 10,
        productCategoryId: 4,
        stock: 5,
        image: null,
        companyId: 1,
      },
      {
        // Samsung Galaxy Z Fold 4 512GB 5G 1889,00
        id: 11,
        productCategoryId: 4,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Samsung HW-Q990B 1089,00
        id: 12,
        productCategoryId: 6,
        stock: 4,
        image: null,
        companyId: 1,
      },
      {
        // Samsung Galaxy Tab S8 ultra 1369,00
        id: 13,
        productCategoryId: 5,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Samsung QD OLED 65S95B (2022) 2199,00
        id: 14,
        productCategoryId: 6,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Samsung QD OLED 55S95B (2022) 1599,00
        id: 15,
        productCategoryId: 6,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Philips 48OLED807 - Ambilight (2022) 1699,00
        id: 16,
        productCategoryId: 6,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // LG OLED42C24LA (2022) + Soundbar 1309,00
        id: 17,
        productCategoryId: 6,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Seagate Expansion Portable 5TB 136,99
        id: 18,
        productCategoryId: 3,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Seagate Expansion Portable 2TB 75,99
        id: 19,
        productCategoryId: 3,
        stock: 100,
        image: null,
        companyId: 1,
      },
      {
        // Inventum TMO430 29,99
        id: 20,
        productCategoryId: 2,
        stock: 100,
        image: null,
        companyId: 1,
      },
    ]);
  },
};
