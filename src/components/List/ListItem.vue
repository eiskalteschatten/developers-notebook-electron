<template>
    <div class="list-item">
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">
    @import '../../assets/scss/variables';

    .list-item {
        border-radius: 5px;
        cursor: default;
        padding: 15px;
    }

    .dark {
        .list-item {
            border-bottom: 2px solid darken($mainBgDark, 3%);

            &:hover {
                background: lighten($mainBgDark, 3%);
            }
        }
    }

    .light {
        .list-item {
            border-bottom: 2px solid darken($mainBgLight, 3%);

            &:hover {
                background: darken($mainBgLight, 10%);
            }
        }
    }
</style>
