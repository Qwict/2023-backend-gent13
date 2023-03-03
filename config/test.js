module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: true,
  },
  cors: {
    origins: ['http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: 'mysql2',
    host: 'dws.qwict.com',
    port: 3306,
    name: 'dws_test',
  },
};