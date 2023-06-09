'use strict';

const Preferences = require('./models/preferences');

let preferences;

module.exports = {
    preferences,
    loadPreferences: async () => {
        try {
            preferences = await Preferences.findById(1);

            if (!preferences) {
                preferences = await Preferences.create();
                console.log('Created the preferences table');
            }

            return preferences;
        }
        catch(error) {
            console.error('An error occurred while loading preferences:', error);
            return;
        }
    }
};
