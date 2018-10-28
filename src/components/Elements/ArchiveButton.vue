<template>
    <div class="icon-button archive-button"></div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">
     .archive-button {
        $size: 15px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: $size;
        cursor: pointer;
        height: $size;
        width: $size;
    }

    .dark {
        .archive-button {
            background-image: url('../../assets/images/dark/archive.svg');
        }
    }

    .light {
        .archive-button {
            background-image: url('../../assets/images/light/archive.svg');
        }
    }
</style>
