const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {
  // Remove any leftover data

  

  // Close database connection
  await shutdownData();
};
