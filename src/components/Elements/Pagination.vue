<template>
    <div class="pagination">
        <ul class="pagination">
            <li v-if="currentPage > 0">
                <a href="?page={{ previousPage }}"><i class="fas fa-arrow-left small-icon"></i></a>
            </li>

            <li v-for="page in numberOfPages" :key="page">
                <a href="?page={{ page }}" v-bind:class="{ active: page === currentPage }">{{ page + 1 }}</a>
            </li>

            <li v-if="nextPage > 0">
                <a href="?page={{ nextPage }}"><i class="fas fa-arrow-right small-icon"></i></a>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: ['currentPage', 'nextPage', 'numberOfPages']
    });
</script>

<style lang="scss">
    .pagination {

    }
</style>
