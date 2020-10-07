require("dotenv/config");

const express = require("express");
const middleware = require("./src/middleware");
const app = express();
const glob = require("glob");

// Custom logger
const appLogger = require("./src/utils/logger");
global.__basedir = __dirname;
app.use(appLogger.requestDetails(appLogger));

// Api docs
app.use('/apidoc', express.static('apidoc'));
app.use('/insomnia.json', express.static('apidoc/insomnia.json'));


app.enable("trust proxy");
middleware(app);


/* Router setup */
const openRouter = express.Router(); // Open routes
app.use("/api/v1/open", openRouter);

// Close router
const apiRouter = express.Router();
app.use('/api/v1', apiRouter);


// Register all routers
glob("./src/components/*", null, (err, items) => {
	items.forEach(component => {
		let routes = require(component).routes;
		if (routes) {
			routes(openRouter, apiRouter);
		}
	});
});

// exporting the app
module.exports = app;
