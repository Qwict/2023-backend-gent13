// Seed only includes first 20 objects of dataset
module.exports = {
  seed: async (knex) => {
    await knex('productprice').insert([{
        "productId": "P100101",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "3.070.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100109",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "1.500.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100201",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "1.000.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100201",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "1.000.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2022-04-13 10:56:18.0000000",
        "quantity": 1
      },
      {
        "productId": "P100202",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "1.800.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100203",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "1.600.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100205",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "900.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2022-04-13 10:56:18.0000000",
        "quantity": 1
      },
      {
        "productId": "P100401",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "3.460.000",
        "unitOfMeasureId": "XBX",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100401",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "1.730.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2022-04-13 10:56:18.0000000",
        "quantity": 1
      },
      {
        "productId": "P100402",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "7.130.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100403",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "12.270.000",
        "unitOfMeasureId": "XBX",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100403",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "12.270.000",
        "unitOfMeasureId": "XPX",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100405",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "386.000.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2021-07-29 13:46:17.0000000",
        "quantity": 1
      },
      {
        "productId": "P100402",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "100.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2022-04-13 10:56:18.0000000",
        "quantity": 1
      },
      {
        "productId": "P100411",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "4.300.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2021-05-10 10:37:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100436",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "5.000.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2018-12-07 10:09:58.0000000",
        "quantity": 1
      },
      {
        "productId": "P100505",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "210.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2022-06-07 13:03:04.0000000",
        "quantity": 1
      },
      {
        "productId": "P100701",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "35.000",
        "unitOfMeasureId": "EA",
        "syncDateTime": "2021-07-29 13:46:17.0000000",
        "quantity": 1
      },
      {
        "productId": "P100702",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "90.000",
        "unitOfMeasureId": "XCS",
        "syncDateTime": "2022-06-07 13:03:04.0000000",
        "quantity": 1
      },
      {
        "productId": "P100709",
        "currencyId": "EUR",
        "syncId": 271,
        "price": "1.110.000",
        "unitOfMeasureId": "XCT",
        "syncDateTime": "2021-07-29 13:46:17.0000000",
        "quantity": 1
      }
    ]);
  },
};