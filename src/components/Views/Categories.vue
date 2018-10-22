<template>
    <div class="full-width">
        <list scrollable="false">
            <list-item @click="selectCategory">
                <router-link to="/categores/1/"/>
                    <div class="color-stripe" style="background-color: red;"></div>
                    <div class="content">
                        <div class="name">Name</div>
                        <div class="description">The description goes here</div>
                    </div>
                </route-link>
            </list-item>
            <list-item @click="selectCategory">
                <router-link to="/categores/2/"/>
                    <div class="color-stripe" style="background-color: blue;"></div>
                    <div class="content">
                        <div class="name">Another one</div>
                        <div class="description">Here is another description</div>
                    </div>
                </route-link>
            </list-item>
        </list>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Category from '../../models/category';

    import List from '../List.vue';
    import ListItem from '../List/ListItem.vue';

    export default Vue.extend({
        data() {
            return {
                categories: [],
                seletedCategory: -1
            }
        },
        methods: {
            selectCategory() {

            }
        },
        components: {
            List,
            ListItem
        },
        async mounted() {
            this.categories = await Category.getAllSorted();
        }
    });
</script>

<style lang="scss" scoped>
    .list-item {
        display: flex;
        flex-direction: row;
        padding: 0;

        .color-stripe {
            margin-right: 5px;
            width: 3px;
        }

        .content {
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
    }
</style>
