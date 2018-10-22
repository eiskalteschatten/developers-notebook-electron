<template>
    <div class="edit-button"></div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">
    @import '../../assets/scss/variables';

     .edit-button {
        $size: 15px;

        background-position: center;
        background-repeat: no-repeat;
        background-size: $size;
        cursor: pointer;
        height: $size;
        width: $size;
    }

    .dark {
        .edit-button {
            background-image: url('../../assets/images/dark/edit.svg');
        }
    }

    .light {
        .edit-button {
            background-image: url('../../assets/images/light/edit.svg');
        }
    }
</style>
