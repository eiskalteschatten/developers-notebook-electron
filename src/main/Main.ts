import { BrowserWindow } from 'electron';
import path from 'path';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow: any;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }

    private static onReady() {
        const browserWindow = {
            width: 800,
            height: 600,
            icon: path.join(__dirname, './assets/images/icon128.png')
        };

        if (process.platform === 'darwin')
            browserWindow['titleBarStyle'] = 'hidden';

        Main.mainWindow = new Main.BrowserWindow(browserWindow);
        Main.mainWindow.loadFile('./src/index.html');
        Main.mainWindow.on('closed', Main.onClose);
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
    }
}
