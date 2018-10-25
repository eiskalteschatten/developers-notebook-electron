<template>
    <div class="full-width">
        <list scrollable="false">
            <list-item v-bind:class="getListItemClasses(category.id)" @contextmenu.native="showContextMenu" v-for="category in categories" :key="category.id" :data-id="category.id">
                <div class="color-stripe" v-bind:style="{ 'background-color': category.color }"></div>
                <div @click="viewCategory(category.id)" class="content">
                    <div class="name">{{ category.name }}</div>
                    <div class="description">{{ category.description }}</div>
                </div>
                <div class="buttons">
                    <div class="buttons-wrapper">
                        <router-link :to="{ name: 'editCategory', params: { id: category.id }}">
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

    import List from '../../List.vue';
    import ListItem from '../../List/ListItem.vue';
    import EditButton from '../../Elements/EditButton.vue';
    import ContextMenuButton from '../../Elements/ContextMenuButton.vue';

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                categories: []
            }
        },
        methods: {
            viewCategory(id) {
                router.push({ name: 'viewCategory', params: { id }});
            },
            getListItemClasses(id) {
                const classes = ['js-category-list-item'];

                if (this.id == id) {
                    classes.push('selected');
                }

                return classes;
            },
            showContextMenu() {
                ipcRenderer.send('show-category-context-menu');
            },
            async populate() {
                this.categories = await Category.getAllNotArchivedSorted();
            }
        },
        components: {
            List,
            ListItem,
            EditButton,
            ContextMenuButton
        },
        async mounted() {
            await this.populate();
        },
        created() {
            eventBus.$on('category-updated', this.populate);
            ipcRenderer.on('category-updated', this.populate);
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

    .dark {
        .list-item {
            &.selected {
                background-color: lighten($mainBgDark, 4%);
            }
        }
    }

    .light {
        .list-item {
            &.selected {
                background-color: darken($mainBgLight, 4%);
            }
        }
    }
</style>
