const createServer = require('./createServer');

async function main() {
  try {
    const server = await createServer();
    await server.start();

    // don't know how to fix this linter issue - how to move the function outside if it is async?
    async function onClose() {
      await server.stop();
      process.exit(0);
    }

    process.on('SIGTERM', onClose);
    process.on('SIGQUIT', onClose);
  } catch (error) {
    // don't know how to fix this linter issue (console.error is probable required here/ I con't use logger here)
    console.error(error); // print the error before exiting
    process.exit(-1);
  }
}

// Wrap inside a main function as top level await is not supported in all NodeJS versions
main();