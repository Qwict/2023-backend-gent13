const {
  tables,
} = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.notification).insert([
      {
        id: '0ebc10c4-a784-4b5a-8efd-b549089f02d6',
        orderId: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
        userId: '95e3745e-7a8d-4947-9ff1-59f76544564b',
        companyId: 1,
        date: 'Sat Mar 04 2023 12:09:30 GMT+0100 (Central European Standard Time)',
        subject: 'Order information',
        audience: 'company',
        text: 'Order by Joris, this notification should be visible for all employees and admins in a company',
        status: false,
        archived: false,
      }, {
        id: '373d4b73-80c2-4ff8-8b60-e4894d90ddd5',
        orderId: null,
        userId: '2b93f1c4-38bd-490d-a0ca-f7b81b9de171',
        companyId: 1,
        date: 'Sat Mar 04 2023 12:09:30 GMT+0100 (Central European Standard Time)',
        subject: 'Random information',
        audience: 'company',
        text: 'This notification is a random announcement for all employees and admins in a company',
        status: false,
        archived: false,
      }, {
        id: '02374203-396f-4391-96b2-6b5ec2238943',
        orderId: '12165d36-cb10-4e12-8d6b-10cdf8f5f9f1',
        userId: '2b93f1c4-38bd-490d-a0ca-f7b81b9de171',
        companyId: null,
        date: 'Sat Mar 04 2023 12:09:30 GMT+0100 (Central European Standard Time)',
        subject: 'Order notification',
        text: 'Private Order notification that should be archived',
        audience: 'private',
        status: false,
        archived: true,
      }, {
        id: '3ce7efd7-0bb3-4719-ad62-938f4b2d3342',
        orderId: null,
        userId: '95e3745e-7a8d-4947-9ff1-59f76544564b',
        companyId: 1,
        date: 'Sat Mar 04 2023 12:09:30 GMT+0100 (Central European Standard Time)',
        subject: 'Employee account created',
        text: 'This employee account was created by a seed. This notification is only for admins',
        audience: 'admin',
        status: false,
        archived: false,
      },
    ]);
  },
};