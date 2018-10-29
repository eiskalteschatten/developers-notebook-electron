<template>
    <div class="sort-field">
        Sort by: <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/variables';

    .sort-field {
        font-size: .8em;
        margin-top: 10px;
    }

    .dark {
        .sort-field {
            select {
                background: $mainBgDark;
            }
        }
    }

    .light {
        .sort-field {
            select {
                background: $mainBgLight;
            }
        }
    }
</style>
