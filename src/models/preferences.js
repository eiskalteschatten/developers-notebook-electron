'use strict';

const Sequelize = require('sequelize');
const db = require('../db');


const Preferences = db.define('preferences', {
    theme: {
        type: Sequelize.STRING,
        defaultValue: 'light'
    },
    checkForUpdates: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

Preferences.sync();

module.exports = Preferences;
