import {ipcRenderer} from 'electron';
import Sequelize from 'sequelize';
import db from '../db';
import router from '../router';


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

Category.delete = async function(id) {
    if (id) {
        await this.destroy({ where: { id } });
    }
};

Category.askDelete = async function(id) {
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
        router.replace({ name: 'categories' });
    });
};

Category.archive = async function(id) {
    if (id) {
        await this.update({ archived: true }, { where: { id } });
    }
};

Category.askArchive = async function(id) {
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
        router.replace({ name: 'categories' });
    });
};

Category.sync();

export default Category;
