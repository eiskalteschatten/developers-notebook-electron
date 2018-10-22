<template>
    <div class="full-width">
        <list scrollable="false">
            <list-item v-bind:class="getListItemClasses(1)">
                <div class="color-stripe" style="background-color: red;"></div>
                <div @click="viewCategory(1)" class="content">
                    <div class="name">Name</div>
                    <div class="description">The description goes here</div>
                </div>
                <div class="buttons">
                    <div class="buttons-wrapper">
                        <router-link :to="{ name: 'editCategory', params: { id: 1 }}">
                            <edit-button/>
                        </router-link>
                        <delete-button/>
                    </div>
                </div>
            </list-item>
            <list-item v-bind:class="getListItemClasses(2)">
                <div class="color-stripe" style="background-color: blue;"></div>
                <div @click="viewCategory(2)" class="content">
                    <div class="name">Another one</div>
                    <div class="description">Here is another description</div>
                </div>
                <div class="buttons">
                    <div class="buttons-wrapper">
                        <router-link :to="{ name: 'editCategory', params: { id: 2 }}">
                            <edit-button/>
                        </router-link>
                        <delete-button/>
                    </div>
                </div>
            </list-item>
        </list>
    </div>
</template>

<script>
    import Vue from 'vue';
    import router from '../../../router';

    import Category from '../../../models/category';

    import List from '../../List.vue';
    import ListItem from '../../List/ListItem.vue';
    import EditButton from '../../Elements/EditButton.vue';
    import DeleteButton from '../../Elements/DeleteButton.vue';

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
                if (this.id === id) {
                    return 'selected';
                }
                return '';
            }
        },
        components: {
            List,
            ListItem,
            EditButton,
            DeleteButton
        },
        async mounted() {
            this.categories = await Category.getAllSorted();
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
                    margin-left: 8px;
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
