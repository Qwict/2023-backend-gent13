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
        // Tanita RD-953 Black 215,00
        id: 4,
        stock: 215,
        image: 'Tanita RD-953 Black.avif',
        companyId: 1,
      },
      {
        // Germin vivoactive 219,00
        id: 5,
        stock: 10,
        image: 'Garmin Vivoactive 4 Black 45mm.avif',
        companyId: 1,
      },
      {
        // Withings Body + Black 92.99
        id: 6,
        stock: 105,
        image: 'Withings Body + Black.avif',
        companyId: 1,
      },
      {
        // Samsung Galaxy S22 128GB 5G 809,00
        id: 7,
        stock: 150,
        image: 'Samsung Galaxy S22 128GB 5G.avif',
        companyId: 1,
      },
      {
        // Samsung Galaxy S21 FE 128GB 5G 579,00
        id: 8,
        stock: 579,
        image: 'Samsung Galaxy S21 FE 128GB 5G.avif',
        companyId: 1,
      },
      {
        // Samsung Galaxy Z Flip 4 256GB 5G 1145,00
        id: 9,
        stock: 15,
        image: 'Samsung Galaxy Z Flip 4 256GB 5G.avif',
        companyId: 1,
      },
      {
        // Samsung Galaxy Z Fold 4 512GB 5G + Black cover leather 1969,00
        id: 10,
        stock: 5,
        image: 'Samsung Galaxy Z Fold 4 512GB 5G + Black cover leather.avif',
        companyId: 1,
      },
      {
        // Samsung Galaxy Z Fold 4 512GB 5G 1889,00
        id: 11,
        stock: 100,
        image: 'Samsung Galaxy Z Fold 4 512GB 5G.avif',
        companyId: 1,
      },
      {
        // Samsung HW-Q990B 1089,00
        id: 12,
        stock: 4,
        image: 'Samsung HW-Q990B.avif',
        companyId: 1,
      },
      {
        // Samsung Galaxy Tab S8 ultra 1369,00
        id: 13,
        stock: 100,
        image: 'Samsung Galaxy Tab S8 ultra.avif',
        companyId: 1,
      },
      {
        // Samsung QD OLED 65S95B (2022) 2199,00
        id: 14,
        stock: 100,
        image: 'Samsung QD OLED 65S95B (2022).avif',
        companyId: 1,
      },
      {
        // Samsung QD OLED 55S95B (2022) 1599,00
        id: 15,
        stock: 100,
        image: 'Samsung QD OLED 55S95B (2022).avif',
        companyId: 1,
      },
      {
        // Philips 48OLED807 - Ambilight (2022) 1699,00
        id: 16,
        stock: 100,
        image: 'Philips 48OLED807 - Ambilight (2022).avif',
        companyId: 1,
      },
      {
        // LG OLED42C24LA (2022) + Soundbar 1309,00
        id: 17,
        stock: 100,
        image: 'LG OLED42C24LA (2022) + Soundbar.avif',
        companyId: 1,
      },
      {
        // Seagate Expansion Portable 5TB 136,99
        id: 18,
        stock: 100,
        image: 'SeagatePicture.avif',
        companyId: 1,
      },
      {
        // Seagate Expansion Portable 2TB 75,99
        id: 19,
        stock: 100,
        image: 'SeagatePicture.avif',
        companyId: 1,
      },
      {
        // Inventum TMO430 29,99
        id: 20,
        stock: 100,
        image: 'Inventum TMO430.avif',
        companyId: 2,
      },
    ]);
  },
};