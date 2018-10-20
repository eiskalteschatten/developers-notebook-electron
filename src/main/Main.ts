import { BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';

import config from '../config/config';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow: any;
    static windowSettingsPath: string;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        const windowBounds: Electron.Rectangle = Main.mainWindow.getBounds();

        const windowSettings: Object = {
            width: windowBounds.width,
            height: windowBounds.height,
            x: windowBounds.x,
            y: windowBounds.y,
            isMaximized: Main.mainWindow.isMaximized(),
            isFullScreen: Main.mainWindow.isFullScreen(),
        };

        fs.writeFile(Main.windowSettingsPath, JSON.stringify(windowSettings), error => {
            if (error) {
                console.error(error);
            }
        });
    }

    private static onClosed() {
        Main.mainWindow = null;
    }

    private static onReady() {
        fs.readFile(Main.windowSettingsPath, 'utf8', (error, data) => {
            if (error) {
                return console.error(error);
            }

            try {
                const windowSettings = JSON.parse(data);

                const browserWindow: Object = {
                    width: windowSettings.width,
                    height: windowSettings.height,
                    icon: path.join(__dirname, './assets/images/icon128.png')
                };

                if (process.platform === 'darwin') {
                    browserWindow['titleBarStyle'] = 'hidden';
                }

                if (windowSettings.x !== 0) {
                    browserWindow['x'] = windowSettings.x;
                }

                if (windowSettings.y !== 0) {
                    browserWindow['y'] = windowSettings.y;
                }


                Main.mainWindow = new Main.BrowserWindow(browserWindow);
                Main.mainWindow.loadFile('./src/index.html');
                Main.mainWindow.on('close', Main.onClose);
                Main.mainWindow.on('closed', Main.onClosed);

                if (windowSettings.isMaximized) {
                    Main.mainWindow.maximize();
                }

                Main.mainWindow.setFullScreen(windowSettings.isFullScreen || false);
            }
            catch(error) {
                console.error(error);
            }
        });
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        app.setName(config.app.name);

        this.windowSettingsPath = path.join(config.app.storagePath, config.app.windowSettingsFile);

        if (!fs.existsSync(this.windowSettingsPath)) {
            const defaultWindowSettingsPath: string = path.resolve('src', 'config', 'windowSettings.json');
            fs.createReadStream(defaultWindowSettingsPath).pipe(fs.createWriteStream(this.windowSettingsPath));
        }
    }
}
