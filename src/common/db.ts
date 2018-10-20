import Sequelize from 'sequelize';
import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';

import config from '../config/config';
const database: Object = config.database;
const dbPath: string = database.path;
const dbFile: string = path.join(dbPath, database.fileName);

if (!fs.existsSync(dbPath)) {
    mkdirp.sync(dbPath);
}


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbFile
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

export default sequelize;
