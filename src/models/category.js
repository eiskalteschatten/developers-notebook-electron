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

Category.save = async function(values) {
    if (!values.name) {
        const errorMessage = 'A name is required to save the category!';
        console.error(errorMessage);
        return {
            error: true,
            errorMessage
        };
    }

    try {
        const savedCategory = {};

        if (values.id) {
            savedCategory.category = await this.update(values, { where: { id: values.id } });
            savedCategory.created = false;
        }
        else {
            savedCategory.category = await this.create(values);
            savedCategory.created = true;
        }

        return savedCategory;
    }
    catch(errorMessage) {
        console.error(errorMessage);
        return {
            error: true,
            errorMessage
        };
    }
};

Category.sync();

module.exports = Category;
