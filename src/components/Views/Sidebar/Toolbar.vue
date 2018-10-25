<template>
    <div class="sidebar-toolbar">
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss" scoped>
    @import '../../../assets/scss/variables';

    .sidebar-toolbar {
        margin-bottom: 15px;
        padding-bottom: 15px;

        div {
           display: inline-block;
           margin: 0 5px;
        }
    }

    .dark {
        .sidebar-toolbar {
            border-bottom: 1px solid $borderColorDark;
        }
    }

    .light {
        .sidebar-toolbar {
            border-bottom: 1px solid $borderColorLight;
        }
    }
</style>
