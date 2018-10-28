<template>
    <Sidebar :close-route-name="closeRouteName">
        <sidebar-toolbar v-if="showToolbar">
            <sidebar-toolbar-button @click.native="askArchiveCategory()" v-if="showArchiveIcon">
                <archive-button/>
                <span class="label">Archive</span>
            </sidebar-toolbar-button>
            <sidebar-toolbar-button @click.native="askUnarchiveCategory()" v-if="showUnarchiveIcon">
                <unarchive-button/>
                <span class="label">Unarchive</span>
            </sidebar-toolbar-button>
            <sidebar-toolbar-button @click.native="askDeleteCategory()" v-if="showDeleteIcon">
                <delete-button/>
                <span class="label">Delete</span>
            </sidebar-toolbar-button>
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
    import {showNotification} from '../../../helper';
    import Category from '../../../models/category';

    import Sidebar from '../Sidebar.vue';
    import SidebarToolbar from '../Sidebar/Toolbar.vue';
    import SidebarToolbarButton from '../Sidebar/ToolbarButton.vue';
    import DeleteButton from '../../Elements/Buttons/DeleteButton.vue';
    import ArchiveButton from '../../Elements/Buttons/ArchiveButton.vue';
    import UnarchiveButton from '../../Elements/Buttons/UnarchiveButton.vue';

    let saveTimeout;

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                category: {},
                showToolbar: false,
                showDeleteIcon: false,
                showArchiveIcon: false,
                showUnarchiveIcon: false,
                closeRouteName: 'categories'
            }
        },
        components: {
            Sidebar,
            SidebarToolbar,
            SidebarToolbarButton,
            DeleteButton,
            ArchiveButton,
            UnarchiveButton
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
                    showNotification(results.errorMessage, 'error');
                }

                loader.classList.add('hidden');
            },
            saveCategoryTimer() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(this.saveCategory, 500);
            },
            askDeleteCategory() {
                Category.askDelete(this.id, true, this.closeRouteName);
            },
            askArchiveCategory() {
                Category.askArchive(this.id, true, this.closeRouteName);
            },
            askUnarchiveCategory() {
                Category.askUnarchive(this.id, true, this.closeRouteName);
            },
            render() {
                this.showToolbar = this.id ? true : false;
                this.showDeleteIcon = this.id ? true : false;
                this.showArchiveIcon = this.id && this.$route.name !== 'categoryArchiveEdit' ? true : false;
                this.showUnarchiveIcon = this.id && this.$route.name === 'categoryArchiveEdit' ? true : false;
            }
        },
        created() {
            this.getCategory();

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
