'use strict';

const Sequelize = require('sequelize');
const db = require('../db');


const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true
    },
    archived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

Category.getAllSorted = async function() {
    return await this.findAll({
        order: [
            [
                Sequelize.fn('lower', Sequelize.col('name')),
                'ASC'
            ]
        ]
    });
};

Category.getAllNotArchivedSorted = async function() {
    return await this.findAll({
        order: [
            [
                Sequelize.fn('lower', Sequelize.col('name')),
                'ASC'
            ]
        ],
        where: {
            archived: false
        }
    });
};

Category.getAllArchivedSorted = async function() {
    return await this.findAll({
        order: [
            [
                Sequelize.fn('lower', Sequelize.col('name')),
                'ASC'
            ]
        ],
        where: {
            archived: true
        }
    });
};

Category.sync();

module.exports = Category;
