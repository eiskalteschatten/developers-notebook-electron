<template>
    <div>
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/variables';

    .sidebar {
        min-width: 200px;
        padding: 15px;
    }

    .dark {
        .sidebar {
            background-color: darken($mainBgDark, 25%);
        }
    }

    .light {
        .sidebar {
            background-color: darken($mainBgLight, 25%);
        }
    }
</style>
