<template>
    <div class="icon-button unarchive-button"></div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">
     .unarchive-button {
        $size: 15px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: $size;
        cursor: pointer;
        height: $size;
        width: $size;
    }

    .dark {
        .unarchive-button {
            background-image: url('../../../assets/images/dark/unarchive.svg');
        }
    }

    .light {
        .unarchive-button {
            background-image: url('../../../assets/images/light/unarchive.svg');
        }
    }
</style>
