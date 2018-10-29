<template>
    <div class="full-width flex-column">
        <div class="flex-0-0-auto flex-row">
            <tabs class="flex-1-0-auto" :tabs="tabs" :activeTab="activeTab"/>
            <sort-field
                class="flex-0-0-auto sort-field"
                :fields="sortFields"
                :type="type"
                :sort-by-default="sortBy"
                :sort-direction-default="sortDirection"
            />
        </div>
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
            <pagination
                v-if="numberOfPages > 1"
                :current-page="page"
                :total-count="count"
                :number-of-pages="numberOfPages"
                :list-route-name="mainRouteName"
            />
        </list>
    </div>
</template>

<script>
    import {ipcRenderer} from 'electron';
    import Vue from 'vue';
    import {eventBus} from '../../../app';
    import router from '../../../router';

    import Category, {paginationLimit} from '../../../models/category';

    import Tabs from '../../Elements/Tabs.vue';
    import List from '../../Elements/List.vue';
    import ListItem from '../../Elements/List/ListItem.vue';
    import EditButton from '../../Elements/Buttons/EditButton.vue';
    import ContextMenuButton from '../../Elements/Buttons/ContextMenuButton.vue';

    import Pagination from '../../Elements/Pagination.vue';
    import SortField from '../../Elements/SortField.vue';

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
                ],
                page: this.$route.query.page || 1,
                count: 0,
                numberOfPages: 1,
                sortFields: {
                    description: 'Description',
                    createdAt: 'Date Created',
                    updatedAt: 'Date Updated',
                    name: 'Name'
                },
                sortBy: 'name',
                sortDirection: 'ASC'
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
                const archived = this.type === 'categoryArchive';
                const queryResults = await Category.getPaginatedSorted(archived, this.page, this.sortBy, this.sortDirection);
                this.categories = queryResults.rows;
                this.numberOfPages = Math.ceil(queryResults.count / paginationLimit);
            }
        },
        components: {
            Tabs,
            List,
            ListItem,
            EditButton,
            ContextMenuButton,
            Pagination,
            SortField
        },
        async created() {
            eventBus.$on('category-updated', this.populate);
            ipcRenderer.on('category-updated', this.populate);

            const self = this;

            eventBus.$on(`${this.type}-change-sort-by`, function(sortBy) {
                self.sortBy = sortBy;
                self.populate();
                self.$router.replace({ name: self.$route.name, query: { page: 1 } });
            });

            this.sortBy = localStorage.getItem(`${this.type}SortBy`) || this.sortBy;
            this.sortDirection = localStorage.getItem(`${this.type}SortDirection`) || this.sortDirection;

            await this.populate();
        },
        beforeDestroy() {
            eventBus.$off(`${this.type}-change-sort-by`);
            eventBus.$off('category-updated');
            ipcRenderer.removeAllListeners('category-updated');
        },
        watch: {
            '$route.query.page': function() {
                this.page = this.$route.query.page;
                this.populate();
            }
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
