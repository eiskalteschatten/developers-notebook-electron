import Sequelize from 'sequelize';
import db from '../db';


const Preferences = db.define('preferences', {
    theme: {
        type: Sequelize.STRING,
        defaultValue: 'light'
    },
    checkForUpdates: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
});

Preferences.sync();

export default Preferences;
