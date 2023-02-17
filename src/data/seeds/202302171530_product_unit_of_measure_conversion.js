// Seed only includes first 20 objects of dataset
module.exports = {
  seed: async (knex) => {
    await knex('product_unit_of_measure_conversion').insert([{
        "productId": "P300001",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300002",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300003",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300004",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300005",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300006",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300007",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300008",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300009",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P300010",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P110401K",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P100001",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "JS_0000001",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "JS_0000002",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "EA",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P100902",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "MTR",
        "fromQuantity": "10.000",
        "toQuantity": "30.000"
      },
      {
        "productId": "P100902",
        "syncId": 1011,
        "fromUnitOfMeasure": "MTR",
        "toUnitOfMeasure": "MTR",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P100903",
        "syncId": 1011,
        "fromUnitOfMeasure": "KGM",
        "toUnitOfMeasure": "KGM",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "P100904",
        "syncId": 1011,
        "fromUnitOfMeasure": "KGM",
        "toUnitOfMeasure": "KGM",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "PIGMENT_B",
        "syncId": 1011,
        "fromUnitOfMeasure": "KGM",
        "toUnitOfMeasure": "KGM",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      },
      {
        "productId": "BASIS_WHITE",
        "syncId": 1011,
        "fromUnitOfMeasure": "EA",
        "toUnitOfMeasure": "KGM",
        "fromQuantity": "10.000",
        "toQuantity": "10.000"
      }
    ]);
  },
};