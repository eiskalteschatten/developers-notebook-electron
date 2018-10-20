import path from 'path';
import os from 'os';
import fs from 'fs';
import mkdirp from 'mkdirp';

const env: string = process.env.NODE_ENV;

let storagePath: string;

switch(process.platform) {
    case 'darwin':
        storagePath = path.join(os.homedir(), 'Library', 'Application Support', "Developer's Notebook");
        break;
    case 'win32':
        storagePath = path.join(os.homedir(), 'AppData', 'Roaming', 'Alex Seifert', "Developer's Notebook");
        break;
    default:
        storagePath = path.join(os.homedir(), '.devnotebook');
        break;
}

if (!fs.existsSync(storagePath)) {
    mkdirp.sync(storagePath);
}

console.log('Application data is saved at:', storagePath);


export default {
    app: {
        name: "Developer's Notebook",
        version: '0.1.0',
        storagePath,
        windowSettingsFile: 'windowSettings.json'
    },
    updates: {
        url: 'https://www.alexseifert.com/bookjournal/api/check-for-updates/'
    },
    database: {
        path: storagePath,
        fileName: env === 'development' ? 'devnotebook-dev.sqlite' : 'devnotebook.sqlite'
    }
};;
