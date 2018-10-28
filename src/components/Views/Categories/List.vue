<template>
    <div class="full-width flex-column">
        <tabs class="flex-0-0-auto" :tabs="tabs" :activeTab="activeTab"/>
        <list scrollable="false" class="flex-1-1-auto">
            <list-item class="js-category-list-item"
                @contextmenu.native="showContextMenu"
                v-for="category in categories"
                :key="category.id"
                :data-id="category.id"
                :selected="category.id == $route.params.id"
            >
                <div class="color-stripe" v-bind:style="{ 'background-color': category.color }"></div>
                <div @click="viewCategory(category.id)" class="content">
                    <div class="name">{{ category.name }}</div>
                    <div class="description">{{ category.description }}</div>
                </div>
                <div class="buttons">
                    <div class="buttons-wrapper">
                        <router-link :to="{ name: editRouteName, params: { id: category.id }}">
                            <edit-button/>
                        </router-link>
                        <context-menu-button @click.native="showContextMenu"/>
                    </div>
                </div>
            </list-item>
        </list>
    </div>
</template>

<script>
    import {ipcRenderer} from 'electron';
    import Vue from 'vue';
    import {eventBus} from '../../../app';
    import router from '../../../router';

    import Category from '../../../models/category';

    import Tabs from '../../Elements/Tabs.vue';
    import List from '../../Elements/List.vue';
    import ListItem from '../../Elements/List/ListItem.vue';
    import EditButton from '../../Elements/Buttons/EditButton.vue';
    import ContextMenuButton from '../../Elements/Buttons/ContextMenuButton.vue';

    export default Vue.extend({
        props: ['type', 'activeTab', 'mainRouteName', 'editRouteName'],
        data() {
            return {
                categories: [],
                tabs: [
                    {
                        name: 'Active Categories',
                        id: 'categories',
                        routeName: 'categories'
                    },
                    {
                        name: 'Archive',
                        id: 'categoryArchive',
                        routeName: 'categoryArchive'
                    }
                ]
            }
        },
        methods: {
            viewCategory(id) {
                router.push({ name: 'viewCategory', params: { id }});
            },
            showContextMenu() {
                ipcRenderer.send('show-category-context-menu', this.type);
            },
            async populate() {
                this.categories = this.type === 'categoryArchive'
                    ? await Category.getAllArchivedSorted()
                    : await Category.getAllNotArchivedSorted();
            }
        },
        components: {
            Tabs,
            List,
            ListItem,
            EditButton,
            ContextMenuButton
        },
        async created() {
            eventBus.$on('category-updated', this.populate);
            ipcRenderer.on('category-updated', this.populate);
            await this.populate();
        }
    });
</script>

<style lang="scss" scoped>
    @import '../../../assets/scss/variables';

    .list-item {
        display: flex;
        flex-direction: row;
        padding: 0;

        .color-stripe {
            margin-right: 5px;
            width: 3px;
        }

        .content {
            cursor: pointer;
            flex: 1 1 auto;
            padding: 15px;

            .name {
                margin-bottom: 5px;
            }

            .description {
                font-size: .8em;
                opacity: .7;
            }
        }

        .buttons {
            position: relative;

            .buttons-wrapper {
                display: flex;
                flex-direction: row;
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);

                a, div {
                    margin-left: 15px;
                }
            }
        }
    }
</style>
