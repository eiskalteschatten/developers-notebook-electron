<template>
    <Sidebar closeRoute="/categories">
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
            <delete-button @click.native="askDeleteCategory" v-if="showDeleteIcon"/>
        </div>
    </Sidebar>
</template>

<script>
    import {ipcRenderer} from 'electron';
    import Vue from 'vue';
    import {eventBus} from '../../../app';
    import Category from '../../../models/category';

    import Sidebar from '../Sidebar';
    import DeleteButton from '../../Elements/DeleteButton.vue';

    let saveTimeout;

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                category: {},
                showDeleteIcon: false
            }
        },
        components: {
            Sidebar,
            DeleteButton
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
                const id = category.id;

                try {
                    if (category.name) {
                        loader.classList.remove('hidden');

                        if (!id) {
                            this.category = await Category.create(category);
                            this.$router.replace({name: 'editCategory', params: { id: this.category.id }});
                        }
                        else {
                            await category.update({
                                name: category.name,
                                description: category.description,
                                color: category.color
                            });
                        }

                        eventBus.$emit('category-updated');

                        loader.classList.add('hidden');
                    }
                }
                catch(error) {
                    console.error(error);
                    loader.classList.add('hidden');
                }
            },
            saveCategoryTimer() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(this.saveCategory, 500);
            },
            askDeleteCategory() {
                const categoryName = this.category.name || 'this category';
                ipcRenderer.send('show-dialog', {
                    message: `Are you sure you want to delete "${categoryName}"?`,
                    detail: 'You can\'t undo this action.',
                    buttons: ['No', 'Yes'],
                    type: 'warning'
                });
            },
            async deleteCategory() {
                if (this.id) {
                    await Category.destroy({where: {id: this.id}});
                    this.$router.replace({name: 'categories'});
                }
            },
            render() {
                this.showDeleteIcon = this.id ? true : false;
            }
        },
        created() {
            this.getCategory();
            eventBus.$on('category-deleted', this.askDeleteCategory);
            ipcRenderer.on('category-delete-confirmed', this.deleteCategory);
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
            border: 1px solid #333333;
            border-radius: 50%;
            cursor: pointer;
            height: $size;
            width: $size;
        }
    }

    .delete-button {
        margin-top: 5px;
    }
</style>
