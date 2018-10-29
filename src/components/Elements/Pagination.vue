<template>
    <div class="pagination align-center">
        <ul class="pagination-list">
            <li v-if="currentPage > 1">
                <router-link :to="{ name: listRouteName, query: { page: previousPage } }" class="pagination-link">&larr;</router-link>
            </li>

            <li v-for="page in numberOfPages" :key="page">
                <router-link :to="{ name: listRouteName, query: { page: page } }" v-bind:class="{ active: page === currentPage }" class="pagination-link">
                    {{ page }}
                </router-link>
            </li>

            <li v-if="nextPage > 0">
                <router-link :to="{ name: listRouteName, query: { page: nextPage } }" class="pagination-link">&rarr;</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: ['currentPage', 'numberOfPages', 'totalCount', 'listRouteName'],
        data() {
            return {
                previousPage: 0,
                nextPage: 0
            };
        },
        methods: {
            calculatePages() {
                this.previousPage = this.currentPage > 1 ? parseInt(this.currentPage) - 1 : 0;
                this.nextPage = this.currentPage < this.numberOfPages ? parseInt(this.currentPage) + 1 : 0;
            }
        },
        created() {
            this.calculatePages();
        },
        watch: {
            '$route.query.page': function() {
                this.calculatePages();
            }
        }
    });
</script>

<style lang="scss">
    @import '../../assets/scss/variables';

    .pagination {
        margin-top: 30px;

        .pagination-list {
            list-style-type: none;
            margin: 0;

            li {
                display: inline-block;
            }

            .pagination-link {
                padding: 0 5px;
                text-decoration: none;

                &:hover {
                    opacity: .7;
                }

                &.active {
                    opacity: .4;
                }
            }
        }
    }

    .dark {
        .pagination-link {
            color: $mainFontColorDark;
        }
    }

    .light {
        .pagination-link {
            color: $mainFontColorLight;
        }
    }
</style>
