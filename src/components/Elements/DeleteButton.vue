<template>
    <div class="delete-button"></div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">
    @import '../../assets/scss/variables';

     .delete-button {
        $size: 15px;

        background-image: url('../../assets/images/delete.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: $size;
        cursor: pointer;
        height: $size;
        width: $size;
    }
</style>
