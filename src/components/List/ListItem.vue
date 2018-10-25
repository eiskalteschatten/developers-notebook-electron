<template>
    <div class="list-item" v-bind:class="{ 'selected': selected }">
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: ['selected']
    });
</script>

<style lang="scss">
    @import '../../assets/scss/variables';

    .list-item {
        cursor: default;
        padding: 15px;
    }

    .dark {
        .list-item {
            border-bottom: 1px solid darken($mainBgDark, 3%);

            &:hover {
                background: lighten($mainBgDark, 3%);
            }

            &.selected {
                background-color: lighten($mainBgDark, 4%);
            }
        }
    }

    .light {
        .list-item {
            border-bottom: 1px solid darken($mainBgLight, 3%);

            &:hover {
                background: darken($mainBgLight, 10%);
            }

            &.selected {
                background-color: darken($mainBgLight, 4%);
            }
        }
    }
</style>
