import {ipcRenderer} from 'electron';
import Sequelize from 'sequelize';
import db from '../db';

import {eventBus} from '../app';
import router from '../router';

export const paginationLimit = 25;

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

Category.getPaginatedSorted = async function(archived, page) {
    return await this.findAndCountAll({
        order: [
            [
                Sequelize.fn('lower', Sequelize.col('name')),
                'ASC'
            ]
        ],
        limit: paginationLimit,
        offset: paginationLimit * (page - 1),
        where: {
            archived
        }
    });
};

Category.save = async function(values) {
    if (!values.name) {
        const errorMessage = 'A name is required to save the category.';
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

function redirectOrRefresh(redirect, routeName) {
    if (redirect) {
        router.replace({ name: routeName });
    }
    else {
        eventBus.$emit('category-updated');
    }
}

Category.delete = async function(id) {
    if (id) {
        await this.destroy({ where: { id } });
    }
};

Category.askDelete = async function(id, redirect, redirectRouteName) {
    const category = await this.findById(id);
    const categoryName = category.name || 'this category';

    ipcRenderer.send('show-dialog', {
        message: `Are you sure you want to delete ${categoryName}?`,
        detail: 'You can\'t undo this action.',
        buttons: ['Yes', 'No'],
        type: 'warning',
        eventNames: ['category-delete-confirmed', 'category-updated']
    });

    ipcRenderer.once('category-delete-confirmed', async () => {
        await Category.delete(category.id);
        redirectOrRefresh(redirect, redirectRouteName);
    });
};

Category.archive = async function(id) {
    if (id) {
        await this.update({ archived: true }, { where: { id } });
    }
};

Category.askArchive = async function(id, redirect, redirectRouteName) {
    const category = await this.findById(id);
    const categoryName = category.name || 'this category';

    ipcRenderer.send('show-dialog', {
        message: `Are you sure you want to archive ${categoryName}?`,
        detail: 'You can unarchive a category in the archive tab.',
        buttons: ['Yes', 'No'],
        type: 'warning',
        eventNames: ['category-archive-confirmed', 'category-updated']
    });

    ipcRenderer.once('category-archive-confirmed', async () => {
        await Category.archive(category.id);
        redirectOrRefresh(redirect, redirectRouteName);
    });
};

Category.unarchive = async function(id) {
    if (id) {
        await this.update({ archived: false }, { where: { id } });
    }
};

Category.askUnarchive = async function(id, redirect, redirectRouteName) {
    const category = await this.findById(id);
    const categoryName = category.name || 'this category';

    ipcRenderer.send('show-dialog', {
        message: `Are you sure you want to unarchive ${categoryName}?`,
        detail: 'You can archive the category again in the active categories tab.',
        buttons: ['Yes', 'No'],
        type: 'warning',
        eventNames: ['category-unarchive-confirmed', 'category-updated']
    });

    ipcRenderer.once('category-unarchive-confirmed', async () => {
        await Category.unarchive(category.id);
        redirectOrRefresh(redirect, redirectRouteName);
    });
};

Category.sync();

export default Category;
