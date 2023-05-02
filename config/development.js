module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: '*',
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: 'mysql2',
    host: 'dws.qwict.com',
    port: 3306,
    name: 'dws_dev',
  },
};