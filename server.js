require("babel-register");
require("babel-polyfill");

const { join } = require("path");

const envFileName = process.env.NODE_ENV == "staging"? `stage.env` : `dev.env`

require('dotenv').config({ path: join(__dirname, envFileName ) })


const port = process.env.PORT ? process.env.PORT : 2163
const app = require("./app");
const chalk = require("chalk");
const { log, info, error } = require("./src/utils").logging;

// Graceful shutdown
process.on("SIGINT", () => {
  process.exit(1);
});

process.on("unhandledRejection", (reason, p) =>
  error("Unhandled Rejection at: Promise ", p, reason)
);


// checking the environment of the node
let server = app.listen(port, () => {
  info(
    chalk.blue(" [ ✓ ] ") +
    `Application - Process ${process.pid} is listening to all incoming requests at: ${port} `
  );
});
