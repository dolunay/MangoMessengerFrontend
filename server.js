// Install express server

const path = require("node:path");
const process = require("node:process");

const express = require("express");

const app = express();

// Serve only the static files form the dist directory
// eslint-disable-next-line node/no-path-concat
app.use(express.static(`${__dirname}/dist/mango-angular-frontend`));

app.get("/*", (req, res) => {
	res.sendFile(
		// eslint-disable-next-line node/no-path-concat
		path.join(`${__dirname}/dist/mango-angular-frontend/index.html`),
	);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
