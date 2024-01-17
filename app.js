const url = require("node:url");
const path = require("node:path");
const process = require("node:process");
const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, `/dist/mango-angular-frontend/index.html`),
			protocol: "file:",
			slashes: true,
		}),
	);
	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (mainWindow === null) createWindow();
});
