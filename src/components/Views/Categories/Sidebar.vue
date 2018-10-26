<template>
    <Sidebar :close-route-name="closeRouteName">
        <sidebar-toolbar v-if="showToolbar">
            <archive-button @click.native="askArchiveCategory(id)" v-if="showArchiveIcon"/>
            <delete-button @click.native="askDeleteCategory(id)" v-if="showDeleteIcon"/>
        </sidebar-toolbar>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control full-width" id="name" v-model="category.name" @keyup="saveCategoryTimer">
        </div>
        <div class="form-group">
            <label for="decription">Description</label>
            <textarea class="form-control full-width" id="decription" v-model="category.description" @keyup="saveCategoryTimer"></textarea>
        </div>
        <div class="flex-row">
            <div class="form-group color-form-group">
                <label for="colorcolorForm">Color</label>
                <input type="color" id="colorForm" class="hidden" v-model="category.color" @change="saveCategoryTimer">
                <div class="color-stripe" v-bind:style="{ 'background-color': category.color }" @click="openColorPicker"></div>
            </div>
        </div>
    </Sidebar>
</template>

<script>
    import {ipcRenderer} from 'electron';
    import Vue from 'vue';
    import {eventBus} from '../../../app';
    import Category from '../../../models/category';

    import Sidebar from '../Sidebar.vue';
    import SidebarToolbar from '../Sidebar/Toolbar.vue';
    import DeleteButton from '../../Elements/DeleteButton.vue';
    import ArchiveButton from '../../Elements/ArchiveButton.vue';

    let saveTimeout;

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                category: {},
                showToolbar: false,
                showDeleteIcon: false,
                showArchiveIcon: false,
                closeRouteName: 'categories'
            }
        },
        components: {
            Sidebar,
            SidebarToolbar,
            DeleteButton,
            ArchiveButton
        },
        methods: {
            async getCategory() {
                this.category = this.id ? await Category.findById(this.id) : {};
            },
            openColorPicker() {
                document.getElementById('colorForm').click();
            },
            async saveCategory() {
                const loader = document.getElementById('generalLoader');
                const category = this.category;

                loader.classList.remove('hidden');

                const results = await Category.save({
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    color: category.color
                });

                if (!results.error) {
                    eventBus.$emit('category-updated');

                    if (results.created) {
                        this.category = results.category;
                        this.$router.replace({name: 'editCategory', params: { id: this.category.id }});
                    }
                }
                else {
                    // do something with the error
                }

                loader.classList.add('hidden');
            },
            saveCategoryTimer() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(this.saveCategory, 500);
            },
            askDeleteCategory(id) {
                const categoryName = this.category.name || 'this category';
                ipcRenderer.send('show-dialog', {
                    message: `Are you sure you want to delete ${categoryName}?`,
                    detail: 'You can\'t undo this action.',
                    buttons: ['Yes', 'No'],
                    type: 'warning',
                    eventNames: ['category-delete-confirmed', 'category-updated'],
                    data: {
                        id
                    }
                });
            },
            async deleteCategory(id) {
                if (id) {
                    await Category.destroy({ where: { id } });
                    this.$router.replace({ name: 'categories' });
                }
            },
            askArchiveCategory(id) {
                const categoryName = this.category.name || 'this category';
                ipcRenderer.send('show-dialog', {
                    message: `Are you sure you want to archive ${categoryName}?`,
                    detail: 'You can unarchive a category in the archive tab.',
                    buttons: ['Yes', 'No'],
                    type: 'warning',
                    eventNames: ['category-archive-confirmed', 'category-updated'],
                    data: {
                        id
                    }
                });
            },
            async archiveCategory(id) {
                if (id) {
                    await Category.update({ archived: true }, { where: { id } });
                    this.$router.replace({ name: 'categories' });
                }
            },
            render() {
                this.showToolbar = this.id ? true : false;
                this.showDeleteIcon = this.id ? true : false;
                this.showArchiveIcon = this.id && this.$route.name !== 'categoryArchiveEdit' ? true : false;
            }
        },
        created() {
            this.getCategory();

            eventBus.$on('category-deleted', id => {
                this.askDeleteCategory(id);
            });
            eventBus.$on('category-archived', id => {
                this.askArchiveCategory(id);
            });
            ipcRenderer.on('category-delete-confirmed', (event, data) => {
                this.deleteCategory(data.id);
            });
            ipcRenderer.on('category-archive-confirmed', (event, data) => {
                this.archiveCategory(data.id);
            });

            if (this.$route.name === 'categoryArchiveEdit') {
                this.closeRouteName = 'categoryArchive';
            }
        },
        mounted() {
            this.render();
        },
        watch: {
            id: function() {
                this.getCategory();
                this.render();
            }
        }
    });
</script>

<style lang="scss" scoped>
    textarea {
        min-height: 200px;
    }

    .color-form-group {
        flex: 1 1 auto;

        .color-stripe {
            $size: 30px;
            border-radius: 50%;
            cursor: pointer;
            height: $size;
            width: $size;
        }
    }

    .delete-button {
        margin-top: 5px;
    }

    .dark {
        .color-stripe {
            border: 1px solid #333333;
        }
    }

    .light {
        .color-stripe {
            border: 1px solid #dcdcdc;
        }
    }
</style>
