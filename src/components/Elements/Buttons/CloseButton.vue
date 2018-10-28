<template>
    <div class="icon-button close-button" v-bind:class="{ 'top-right': topRight }"></div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: ['topRight']
    });
</script>

<style lang="scss">
     .close-button {
        $size: 15px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: $size;
        cursor: pointer;
        height: $size;
        width: $size;

        &.top-right {
            position: absolute;
            right: 10px;
            top: 10px;
        }

    }

    .dark {
        .close-button {
            background-image: url('../../../assets/images/dark/close-x.svg');
        }
    }

    .light {
        .close-button {
            background-image: url('../../../assets/images/light/close-x.svg');
        }
    }
</style>
