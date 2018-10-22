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
        min-width: 300px;
        padding: 15px;

        .sidebar-title {
            font-size: 1.1em;
            margin-top: 0;
        }
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
