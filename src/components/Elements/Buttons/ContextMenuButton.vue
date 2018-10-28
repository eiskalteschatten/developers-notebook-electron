<template>
    <div class="icon-button contextmenu-button"></div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">
     .contextmenu-button {
        $size: 15px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: $size;
        cursor: pointer;
        height: $size;
        width: $size;
    }

    .dark {
        .contextmenu-button {
            background-image: url('../../../assets/images/dark/contextmenu.svg');
        }
    }

    .light {
        .contextmenu-button {
            background-image: url('../../../assets/images/light/contextmenu.svg');
        }
    }
</style>
