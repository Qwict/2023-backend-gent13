const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.category).insert([
      {
        id: 1,
        name: 'Sport items',
        description: 'Items that have somthing to do with various outdoor sports',
        category_img: 'SportsCategory.avif',
      },
      {
        id: 2,
        name: 'Care items',
        description: 'Various items concerning health and beauty',
        category_img: 'CareCategory.avif',
      },
      {
        id: 3,
        name: 'Hardware',
        description: 'Various types of hardware, including servers with built in hardware',
        category_img: 'HardwareCategoryImage.avif',
      },
      {
        id: 4,
        name: 'Telephony',
        description: 'Electronics used to call / communicate / play',
        category_img: 'PhoneCategoryImage.avif',
      },
      {
        id: 5,
        name: 'Computers & Tablets',
        description: 'Electronics used to call / communicate / play',
        category_img: 'ComputersAndTablets.avif',
      },
      {
        id: 6,
        name: 'Image & Sound',
        description: 'Electronics used to listen to music / see videos',
        category_img: 'ImageAndSoundCategory.avif',
      },
    ]);
  },
};